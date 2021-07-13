export const watchSession=(req,res,next)=>{
    res.locals.user = req.session.user || {}
    res.locals.isLogIn = req.session.isLogIn
    console.log(req.session.user)
    next()
}