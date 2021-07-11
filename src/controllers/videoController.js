export const  home =(req,res)=>{
    res.render("home")
}

export const getUpload = (req,res) =>{
    res.render("video/upload")
}

export const postUpload = (req,res) =>{
    const {title,description,hashtags} = req.body
    //나중에 db 생성 
    return res.redirect("/")
}
