import Video from "../model/video"
import User from "../model/user"
export const  home = async(req,res)=>{
    const videos = await Video.find({}).populate('owner')
    console.log(videos)
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
    const videos = await Video.find({}).populate('owner')
    const index = videos.findIndex(i=>String(i._id) === id)
    videos.splice(index,1)
    const user = await User.findById(video.owner).populate('video')
    const hashtags = video.hashtags 
    return res.render("video/watch",{video,hashtags,videos})
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

export const getEditVideo = async(req,res)=>{
    const {params :{id}}=req
    const video = await Video.findById(id)
    return res.render("video/editVideo",{video})
}

export const postEditVideo = async(req,res) =>{
    const {
        body : {title,description,hashtags},
        params : {id},
        session : {user : {_id}}
    } = req
    const video = await Video.findById(id).populate("owner")
    if(String(video.owner._id) !== String(_id)){
        //flash
        return res.redirect(`/video/${id}/edit-video`)
    }
    await Video.findByIdAndUpdate(id,{
        title,
        description,
        hashtags : Video.formatHashTags(hashtags)
    })
    video.save()
    return res.redirect("/")
}

export const getSearch = async(req,res) => {
    const {
        query : {search}
    }=req
    let videos = []
    if(search){
        videos = await Video.find({
          title: {
            $regex: new RegExp(`${search}$`, "i"),
          },
        }).populate("owner");
      }
    else{
        return res.render("home")
    }
    return res.render("result", { videos });
}

export const thumbs= async(req,res)=>{
    const {params : {id},
            body : {status : {flag , up , down}}    
    }=req
    const video = await Video.findById(id)
    if(!video){
        return res.sendStatus(404);
    }
    if(flag === "up"){
        up === 1 ? video.meta.like += 1 : video.meta.like -= 1
        if(down)video.meta.unLike -= 1
    }else{
        down === 1 ? video.meta.unLike += 1 : video.meta.unLike -= 1
        if(up) video.meta.like -= 1
    }
    video.save()
    return res.sendStatus(200)
}