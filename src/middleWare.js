export const watchSession=(req,res,next)=>{
    console.log(req.session)
    next()
}