import 'regenerator-runtime'
const commentInput = document.querySelector(".comment-input")
const commentForm = document.getElementById("comment-form")
const videoContainer = document.querySelector(".main-video")
const submit = document.getElementById("submit"),
    cancle = document.getElementById("cancle"),
    textarea = document.querySelector(".comment-input"),
    profileImg = document.getElementById("profileImg"),
    
    commentHeader = document.querySelector(".comment-header")
    
const {dataset : {id}} = videoContainer

const createComment = async()=>{
    
    const data = await (await fetch(`/api/videos/${id}/getuserinfo`)).json()
    const{
        comment : {text , createdAt , _id : commentId ,
        owner : {avatarUrl , name ,_id}}
    }=data
    const div= document.createElement('div')
    div.classList.add('comment-user')
    div.dataset.commentId = `${commentId}`
    div.innerHTML = `
    <a href=/user/${_id}> 
        <img src=/${avatarUrl} class="profileImg"> 
    </a>
    <div class="user">
        <div class="user-info">
            <span> ${name} 0초전 </span>
        </div>
        <div >
            <span class='user-comment'>${text}</span>
        </div>
    </div>
    <div class="delete-box">
        <i class="far fa-trash-alt delete"></i>
    </div>`
    commentHeader.after(div)
    handleMouse()
}

const handleComment=async(e)=>{
    const text = commentInput.value
    commentInput.value=""
    auto()
    await fetch(`/api/videos/${id}/comments`,{
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text })
    })
    createComment()
}
const handleInput=()=>{
    submit.style.display="block"
    cancle.style.display="block"
}
const handleSubmitBtn=(e)=>{
    if(e.target.value !== ""){
        submit.style.backgroundColor="#065FD4"
        submit.style.color="white"
    }else{
        submit.style.backgroundColor="#EFEFEF"
        submit.style.color="black"
    }
}
const auto = () =>{
    textarea.style.height = "auto"   
    profileImg.style.height = "auto" 
}
const handleCancle =()=>{
    submit.style.display="none"
    cancle.style.display="none"
    commentInput.value=""
    auto()
}
submit.addEventListener("click",handleComment)
commentInput.addEventListener("click",handleInput)
commentInput.addEventListener("input",handleSubmitBtn)
cancle.addEventListener("click",handleCancle)
//댓글 입력창 자동 길이조정
textarea.addEventListener("input",function(textarea){ 
    this.style.height = "auto"
    let scHeight = this.scrollHeight
    profileImg.style.height = `${scHeight+31}px`
    this.style.height = `${scHeight}px`
})

function handleDelete(){
    console.log(this)
    const parentNode = this.parentNode.parentNode
    const commentContainer = document.getElementById("comment")
    commentContainer.removeChild(parentNode)
    const {dataset : {commentId}} = parentNode
    fetch(`/api/videos/${id}/deletecomments`,{
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ commentId })
    })
}


const handleMouse=()=>{
    let users = document.querySelectorAll(".comment-user") // 여기에서 선언안하면 댓글을 달았을때 인식을 못함
    users.forEach(u=>{
        const deleteBtn = u.querySelector(".delete")
        u.addEventListener("mouseover",function(e){
            if(deleteBtn){
                deleteBtn.style.display = "block"
                deleteBtn.addEventListener("click",handleDelete)
            }
        })
        u.addEventListener("mouseleave",function(){
            if(deleteBtn) deleteBtn.style.display="none" 
            
        })
    })
}
handleMouse()