(()=>{var e=document.querySelector(".fa-thumbs-up "),n=document.querySelector(".fa-thumbs-down "),t=document.querySelector(".main-video"),r=document.getElementById("up"),i=document.getElementById("down"),o=document.querySelector(".content"),u=document.createElement("span");u.classList.add("messages");var d={flag:"",up:0,down:0},a=t.dataset,c=a.id,s=a.login;e.addEventListener("click",(function(){"true"!==s?u.innerText="로그인후에 사용해주세요.":(d.flag="up",d.up?(u.innerText="'좋아요' 취소 하였습니다",d.up=0,r.innerText=Number(r.innerText)-1):(u.innerText="'좋아요' 클릭 하였습니다.",d.up=1,r.innerText=Number(r.innerText)+1),fetch("/api/videos/".concat(c,"/thumbs"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:d})}),1===d.down&&(d.down=0,i.innerText=Number(i.innerText)-1)),o.after(u)})),n.addEventListener("click",(function(){"true"!==s?u.innerText="로그인후에 사용해주세요.":(d.flag="down",d.down?(u.innerText="'싫어요' 취소 하였습니다",d.down=0,i.innerText=Number(i.innerText)-1):(u.innerText="'싫어요' 클릭 하였습니다.",d.down=1,i.innerText=Number(i.innerText)+1),fetch("/api/videos/".concat(c,"/thumbs"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:d})}),1===d.up&&(d.up=0,r.innerText=Number(r.innerText)-1)),o.after(u)}))})();