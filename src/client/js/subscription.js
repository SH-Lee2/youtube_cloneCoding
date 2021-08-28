
const subscriptionBtn = document.getElementById("subscription"),
    subscribers = document.getElementById("subscribers"),
    videoContainer = document.querySelector(".main-video"),
    content = document.querySelector(".content")
    span = document.createElement("span")
span.classList.add("messages")

const {dataset : {id,login}} = videoContainer

subscriptionBtn.addEventListener("click",()=>{
    let {innerText} = subscriptionBtn
    console.log(login)
    if(login==="true"){
        if(innerText === "구독중"){
            span.innerText="구독 취소 하였습니다."
            subscribers.innerText = Number(subscribers.innerText) - 1
            subscriptionBtn.innerText = "구독"
        }else if(innerText === "구독"){
            span.innerText="구독 하였습니다."
            subscribers.innerText = Number(subscribers.innerText) + 1
            subscriptionBtn.innerText = "구독중"
        }
        fetch(`/api/videos/${id}/subscription`,{
            method : "POST"
        })
    }else span.innerText="로그인후 사용해주세요"
    content.after(span)
})
