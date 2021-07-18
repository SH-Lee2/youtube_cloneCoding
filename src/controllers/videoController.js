import Video from "../model/video"
import User from "../model/user"
export const  home = async(req,res)=>{
    const videos = await Video.find({}).populate('owner')
    res.render("home",{videos})
}

export const getUpload = (req,res) =>{
    console.log("start")
    res.render("video/upload")
}

export const postUpload = async(req,res) =>{
    const {
        body: {title,description,hashtags},
        session : {user : {_id}},
        file : {path}
    }=req
    const video = await Video.create({
        video : path,
        title,
        description,
        hashtags : Video.formatHashTags(hashtags),
        owner : _id
        
    })
    const user = await User.findById(_id)
    user.video.push(video._id)
    user.save()
    return res.redirect("/")
}
