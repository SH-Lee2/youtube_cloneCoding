import User from "../model/user"
import bcrypt from "bcrypt"
import fetch from "node-fetch"
export const getJoin =(req,res)=>{
    res.render("user/join")
}

export const postJoin= async (req,res)=>{
    const {
        name,id,password,password2,location,email
    }=req.body
    const user = await User.exists({$or:[{id},{email}]}) 
    if(user){
        //flash 메세지 
        console.log("exites User")
        return res.render("user/join")
    }
    if(password !== password2){
        // 나중에 express-flash 사용해서 에러 전달 
        console.log("error")
        return res.render("user/join")
    }
    await User.create({
        name,
        id,
        password,
        location,
        email
    })


    return res.redirect('/login')
} 

export const getLogin =(req,res)=>{
    res.render("user/login")
}

export const postLogin = async(req,res)=>{
    const {id,password}=req.body
    //users db에서 유저가 있는지 확인 없으면 리턴 
    const user = await User.findOne({id})
    if(!user){
        //flash
        console.log("can not find User")
        return res.render("user/login")
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        //flash
        console.log("to have a wrong password")
        return res.render("user/login")
    }
    //유저가 있으면 세션에 저장 
    req.session.isLogIn = true
    req.session.user = user
    return res.redirect('/')
}

export const startGitHub = (req,res)=>{
    const baseUrl = "https://github.com/login/oauth/authorize"
    const config = {
        client_id : "3aafa305d8174a398847",
        allow_signup : false,
        scope : "user:email  read:user"
    }
    const configUrl = new URLSearchParams(config).toString()
    const finalUrl = `${baseUrl}?${configUrl}`
    console.log(finalUrl)
    return res.redirect(finalUrl)
}

export const finishGitHub = async(req,res)=>{
    const baseUrl = "https://github.com/login/oauth/access_token"
    const config = {
        client_id : "3aafa305d8174a398847",
        client_secret : "bf493fd15fb6fa2d3599761276ea3b84f62b6061",
        code : req.query.code
    }
    const configUrl = new URLSearchParams(config).toString()
    const finalUrl = `${baseUrl}?${configUrl}`
    const tokenRequest = await(await fetch(finalUrl,{
        method : "POST",
        headers : {
            Accept: "application/json"
        }
    })).json()
    if("access_token" in tokenRequest){
        const apiUrl = "https://api.github.com/user"
        const {access_token} = tokenRequest
        const userData = await (
            await fetch(apiUrl,{
                method : "GET",
                headers : {
                    Authorization: `token ${access_token}`
                }
            })
        ).json()
        const emailData = await(
            await fetch(`${apiUrl}/emails`,{
            method : "GET",
            headers : {
                Authorization: `token ${access_token}`
            }
        })
        ).json()
        const emailObj = emailData.find(email => email.primary === true && email.verified=== true)
        if(!emailObj){
            return res.redirect("/login");
        }
        let user = await User.findOne({emil : emailObj.emil})
        if(!user){
            user = await User.create({
                name : userData.name? userData.name : "Unknown",
                id : "",
                password : "",
                avatarUrl : userData.avatar_url,
                email : emailObj.email,
                location: userData.location ? userData.location :"Unknown",
                socialLogin : true
            })
        req.session.user = user;
        req.session.loggedIn = true
        return res.redirect("/");
        }else{
            return res.redirect("/login")
        }
    }
}


export const logOut = (req,res)=>{
    req.session.isLogIn = false
    req.session.user = {}
    return res.redirect("/")
}