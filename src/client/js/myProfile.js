const selectMenu = document.querySelectorAll("li")
selectMenu.forEach(v=>{
    v.addEventListener("click",function(){
        const selected = document.getElementById("select")
        v.setAttribute('id','select')
        selected.removeAttribute('id')
    })
})