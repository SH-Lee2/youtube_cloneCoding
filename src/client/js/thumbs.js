
const thumbsUP = document.querySelector(".fa-thumbs-up ")
const thumbsDown = document.querySelector(".fa-thumbs-down ")
const videoContainer = document.querySelector(".main-video")
const upValue = document.getElementById('up'),
    downValue = document.getElementById('down'),
    content = document.querySelector(".content")
let span = document.createElement("span")
span.classList.add("messages")

let status = {
    flag : "",
    up : 0,
    down : 0
}
const {dataset : {id,login}} = videoContainer

thumbsUP.addEventListener("click",()=>{
    if(login !== "true") span.innerText="로그인후에 사용해주세요."
    else{
    status.flag = "up"
    if(!status.up){
        span.innerText="'좋아요' 클릭 하였습니다."
        status.up=1
        upValue.innerText= Number(upValue.innerText)+1
    }else{
        span.innerText="'좋아요' 취소 하였습니다"
        status.up = 0
        upValue.innerText = Number(upValue.innerText)-1
    }
    fetch(`/api/videos/${id}/thumbs`,{
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
    })
    if(status.down===1){
        status.down = 0
        downValue.innerText = Number(downValue.innerText)-1
    }}
    content.after(span)
})
thumbsDown.addEventListener("click",()=>{
    if(login !== "true") span.innerText="로그인후에 사용해주세요."
    else{status.flag = "down"
        if(!status.down){
        span.innerText="'싫어요' 클릭 하였습니다."
        status.down=1
        downValue.innerText = Number(downValue.innerText)+1
        }else{
            span.innerText="'싫어요' 취소 하였습니다"
            status.down = 0
            downValue.innerText = Number(downValue.innerText)-1
        }
    fetch(`/api/videos/${id}/thumbs`,{
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status}),
    })
    if(status.up===1){
        status.up = 0
        upValue.innerText = Number(upValue.innerText)-1
    }}
    content.after(span)
})








