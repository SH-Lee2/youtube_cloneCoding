import multer from "multer"

export const watchSession=(req,res,next)=>{
    res.locals.user = req.session.user || {}
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    next()
}

export const protectorMiddleware = (req,res,next)=>{
    //로그인 되있으면 패스
    if(req.session.loggedIn){
        return next()
    }else{
        req.flash("error", "로그인후 이용해주세요.")
        return res.redirect("/login")
    }
}



export const publicOnlyMiddleware = (req,res,next) =>{
    if(!req.session.loggedIn){
        return next()
    }else{
        req.flash("error", "로그아웃후 이용해주세요")
        return res.redirect("/")
    }
}
export const avatarUpload  = multer({dest : 'uploads/avatar/'})
export const videoUpload  = multer({dest : 'uploads/video/'})