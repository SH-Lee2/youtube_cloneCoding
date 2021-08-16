const thumbsUP = document.querySelector(".fa-thumbs-up")
const thumbsDown = document.querySelector(".fa-thumbs-down ")
const videoContainer = document.querySelector(".main-video")
const upValue = document.getElementById('up')
    downValue = document.getElementById('down')
    // thumbsContainer = document.querySelector(".thumbs")
let status = {
    flag : "",
    up : 0,
    down : 0
}
const {dataset : {id}} = videoContainer

thumbsUP.addEventListener("click",()=>{
    status.flag = "up"
    if(!status.up){
        status.up=1
        upValue.innerText= Number(upValue.innerText)+1
    }else{
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
    }
    console.log(status)
})





thumbsDown.addEventListener("click",()=>{
    status.flag = "down"
    if(!status.down){
        status.down=1
        downValue.innerText = Number(downValue.innerText)+1
    }else{
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
    }
    console.log(status)

})


