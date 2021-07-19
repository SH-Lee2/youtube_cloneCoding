import Video from "../model/video"
import User from "../model/user"
export const  home = async(req,res)=>{
    const videos = await Video.find({}).populate('owner')
    res.render("home",{videos})
}

export const getUpload = (req,res) =>{
    res.render("video/upload")
}

export const postUpload = async(req,res) =>{
    const {
        body: {title,description,hashtags},
        session : {user : {_id}},
        file : {path}
    }=req
    console.log(req.file)
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

export const watch = async(req,res)=>{
    const {params : {
        id
    }}=req
    const video = await Video.findById(id).populate('owner')
    const user = await User.findById(video.owner).populate('video')
    const hashtags = video.hashtags
    return res.render("video/watch",{video,hashtags})
}

export const deleteVideo = async(req,res)=>{
    const {
        params : {id},
        session : {user:{_id}}   
    }=req
    const video = await Video.findById(id).populate("owner")
    console.log(video.owner._id)
    await Video.findByIdAndDelete(id)
    
    if(String(_id) !== String(video.owner._id)){
        return res.redirect(`/video/${id}/watch`)
    }
    const user = await User.findById(video.owner._id)
    user.video.pull(id)
    user.save()
    return res.redirect("/")
}