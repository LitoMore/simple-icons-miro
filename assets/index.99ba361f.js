import"./style.a87c9e06.js";async function t(){miro.board.ui.on("icon:click",async()=>{await miro.board.ui.openPanel({url:"app.html"})}),miro.board.ui.on("drop",async({x:o,y:i,target:a})=>{console.log("something was dropped",o,i,a);const n=await miro.board.createImage({title:"This is an image",url:"https://miro.com/blog/wp-content/uploads/2023/10/Frame-12772209-1536x806.png",x:0,y:0,width:800,rotation:0});console.log(n)})}t();
