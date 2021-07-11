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