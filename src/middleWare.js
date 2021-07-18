import multer from "multer"

export const watchSession=(req,res,next)=>{
    res.locals.user = req.session.user || {}
    res.locals.loggedIn = req.session.loggedIn
    next()
}

export const avatarUpload  = multer({dest : 'uploads/avatar/'})
export const videoUpload  = multer({dest : 'uploads/video/'})