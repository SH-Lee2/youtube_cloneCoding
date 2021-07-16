export const watchSession=(req,res,next)=>{
    res.locals.user = req.session.user || {}
    res.locals.loggedIn = req.session.loggedIn
    next()
}