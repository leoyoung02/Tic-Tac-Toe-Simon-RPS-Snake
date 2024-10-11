let gameSeq=[];
let userSeq=[];
let btns=["yellow","green","purple","red"]

let started=false;
let level=0;
let h2=document.querySelector("h2")

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game start");
        started=true;

        levelUp();
      
    }
})

function gameFlash(btn){
btn.classList.add("flash");
setTimeout(function(){
    btn.classList.remove("flash");
},250)
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },500)
    }

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randInx=Math.floor(Math.random() *3);
    let randomColor=btns[randInx];
    let randBtn=document.querySelector(`.${randomColor}`);
    // console.log(randInx)
    // console.log(randomColor)
    // console.log(randBtn)
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}
function checkAns(idx){
   
   if(userSeq[idx]=== gameSeq[idx])
   {
   if(userSeq.length==gameSeq.length){
    setTimeout(levelUp,1050);
   }

   }
   else {
   h2.innerHTML=`Game Over !<br><b>Your Score : ${level} <b><br> Press Any Key to Start`;
   reset();
   }  
}

function btnPress(){
  let btn=this;
    userFlash(btn);
   let userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    console.log("user",userSeq)
    checkAns( userSeq.length-1);
}
let allbtn=document.querySelectorAll(".btn");
for(btn of allbtn){
    btn.addEventListener("click",btnPress)
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}