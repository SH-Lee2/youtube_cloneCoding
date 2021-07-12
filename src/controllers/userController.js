import User from "../model/user"
import bcrypt from "bcrypt"
export const getJoin =(req,res)=>{
    res.render("user/join")
}

export const postJoin= async (req,res)=>{
    const {
        name,id,password,password2,location
    }=req.body
    const user = await User.exists({id}) 
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
        location
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
    console.log(typeof password, typeof user.password)
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
