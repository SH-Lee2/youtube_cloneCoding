
const subscriptionBtn = document.getElementById("subscription"),
    subscribers = document.getElementById("subscribers"),
    videoContainer = document.querySelector(".main-video")
const {dataset : {id}} = videoContainer
let status = 0
subscriptionBtn.addEventListener("click",()=>{
    if(status){
        status = 0
        subscribers.innerText = Number(subscribers.innerText) - 1
        subscriptionBtn.innerText = "구독"
    }else{
        status = 1
        subscribers.innerText = Number(subscribers.innerText) + 1
        subscriptionBtn.innerText = "구독중"
    }
    fetch(`/api/videos/${id}/subscription`,{
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
    })
})