export const getJoin =(req,res)=>{
    res.render("user/join")
}

export const postJoin=(req,res)=>{
    const {
        name,id,password,password2,location
    }=req.body
    if(password !== password2){
        // 나중에 express-flash 사용해서 에러 전달 
        console.log("error")
        return res.render("user/join")
    }
    return res.redirect('/')
} 

export const getLogin =(req,res)=>{
    res.render("user/login")
}

export const postLogin =(req,res)=>{
    const {id,password}=req.body
    //users db에서 유저가 있는지 확인 없으면 리턴 

    //유저가 있으면 세션에 저장 
    return res.redirect('/')
}
