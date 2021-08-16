const video = document.getElementById("video"),
    view = document.getElementById("view"),
    videoContainer = document.querySelector(".main-video")

const {dataset : {id}} = videoContainer

video.addEventListener('ended',()=>{
    fetch(`/api/videos/${id}/view`,{
        method : "POST"
    })
    console.log("finish")
})