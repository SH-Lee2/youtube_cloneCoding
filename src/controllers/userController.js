import User from "../model/user"
import Video from "../model/video"
import bcrypt from "bcrypt"
import fetch from "node-fetch"
import "dotenv/config"
import flash from "express-flash"
export const getJoin =(req,res)=>{
    res.render("user/join")
}

export const postJoin= async (req,res)=>{
    const {
        name,id,password,password2,location,email
    }=req.body
    //const user = await User.exists({$or:[{id},{email}]}) 
    const userIdCheck = await User.exists({id})
    const emailCheck = await User.exists({email}) 
    if(userIdCheck ){
        req.flash('error',"아이디 중복 , 다른 아이디를 사용해주세요")
        return res.render("user/join")
    }
    if(emailCheck){
        req.flash('error',"이메일 중복 , 다른 이메일을 사용해주세요")
        return res.render("user/join")
    }
    if(password !== password2){
        req.flash('error','비밀번호가 일치하지 않습니다')
        return res.render("user/join")
    }
    await User.create({
        name,
        id,
        password,
        location,
        email
    })

    req.flash("join","회원가입 성공!")
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
        req.flash('error','아이디를 찾을수 없습니다.')
        return res.render("user/login")
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        req.flash('error',"비밀번호가 일치하지 않습니다.")
        return res.render("user/login")
    }
    //유저가 있으면 세션에 저장 
    req.session.loggedIn = true
    req.session.user = user
    req.flash("login","로그인 하였습니다.")
    return res.redirect('/')
}

export const startGitHub = (req,res)=>{
    const baseUrl = "https://github.com/login/oauth/authorize"
    const config = {
        client_id : process.env.CLIENT_ID,
        allow_signup : false,
        scope : "user:email  read:user"
    }
    const configUrl = new URLSearchParams(config).toString()
    const finalUrl = `${baseUrl}?${configUrl}`
    return res.redirect(finalUrl)
}

export const finishGitHub = async(req,res)=>{
    const baseUrl = "https://github.com/login/oauth/access_token"
    const config = {
        client_id : process.env.CLIENT_ID,
        client_secret : process.env.CLIENT_SECRET,
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
        }
        req.session.user = user;
        req.session.loggedIn = true
        req.flash("login","로그인 하였습니다.")
        return res.redirect("/");
        }else{
            return res.redirect("/login")
        }
    }



export const logOut = (req,res)=>{
    req.session.loggedIn = false
    req.session.user = {}
    req.flash("logout","로그아웃 하였습니다.")
    return res.redirect("/")
}

export const getChangePassword = (req,res) => {
    return res.render("user/changePassword")
}
export const postChangePassword = async (req,res) => {
    const {
        body : {old,new1,new2}
    }=req
    const {
        session : {user:{_id,password}}
    }=req
    const user = await User.findById(_id)
    const match = await bcrypt.compare(old,password)
    if(new1 !== new2){
        req.flash('error','변경한 비밀번호가 일치하지 않습니다.')
        return res.render("user/changePassword")
    } 
    if(!match){
        req.flash('error','현재 비밀번호가 일치하지 않습니다.')
        return res.render("user/changePassword")
    }
    user.password = new1
    user.save()
    req.flash('messages','비밀번호 변경 완료.')
    return res.redirect("/")
}

export const myProfile = async(req, res) =>{
    const {params : {id},
    session : {user:{_id}} }=req
    const users = await User.findById(id).populate({path :"video",populate : {path : 'owner'}})
    const users2 = await User.findById(_id).populate({path:'subscribeVideo', populate : {path : 'owner'}})
    let subscribers =[];
    if(users2 &&users2.subscribeVideo.length) subscribers = users2.subscribeVideo
    return res.render("user/myProfile",{users ,subscribers})
}

export const getEditProfile = (req,res)=>{
    return res.render("user/editProfile")
}

export const postEditProfile = async(req,res)=>{
    const {
        body : {name,location},
        session : {user : {
            _id ,avatarUrl
        }},
        file
    }=req
    const userUpdate = await User.findByIdAndUpdate(_id,{
        name,
        location,
        avatarUrl : file ? file.path : avatarUrl
    },{new : true})
    req.session.user = userUpdate
    req.flash('messages',"프로필 변경 되었습니다.")
    return res.redirect(`/user/${_id}/editProfile`)
}
