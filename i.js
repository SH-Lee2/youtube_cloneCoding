let a ="a,b,c,d,e,f"
a = a.split(",").map(v=>
    "#"+v
)
console.log(a)