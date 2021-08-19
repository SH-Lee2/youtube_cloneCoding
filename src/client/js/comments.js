const commentInput = document.querySelector(".comment-input")
const commentForm = document.getElementById("comment-form")
const videoContainer = document.querySelector(".main-video")
const submit = document.getElementById("submit")
const {dataset : {id}} = videoContainer
const handleComment=(e)=>{
    const text = commentInput.value
    commentInput.value=""    
    fetch(`/api//videos/${id}/comments`,{
        method : "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ text })
    })
    
}
const handleInput=(e)=>{
    submit.style.display="block"
    
}
const handleSubmiBtn=(e)=>{
    if(e.target.value !== ""){
        submit.style.backgroundColor="#065FD4"
        submit.style.color="white"
    }else{
        submit.style.backgroundColor="#EFEFEF"
        submit.style.color="black"
    }
}
submit.addEventListener("click",handleComment)
commentInput.addEventListener("click",handleInput)
commentInput.addEventListener("input",handleSubmiBtn)