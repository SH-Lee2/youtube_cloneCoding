
const subscriptionBtn = document.getElementById("subscription"),
    subscribers = document.getElementById("subscribers"),
    videoContainer = document.querySelector(".main-video")
const {dataset : {id}} = videoContainer

subscriptionBtn.addEventListener("click",()=>{
    let {innerText} = subscriptionBtn
    if(innerText === "구독중"){
        console.log(innerText)
        subscribers.innerText = Number(subscribers.innerText) - 1
        subscriptionBtn.innerText = "구독"
    }else if(innerText === "구독"){
        console.log(innerText)
        subscribers.innerText = Number(subscribers.innerText) + 1
        subscriptionBtn.innerText = "구독중"
    }
    fetch(`/api/videos/${id}/subscription`,{
        method : "POST"
    })
})