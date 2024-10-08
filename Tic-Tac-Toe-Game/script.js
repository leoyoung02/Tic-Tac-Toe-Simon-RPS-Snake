let boxs = document.querySelectorAll(".cell");
let resetBtn = document.querySelector("#reset-btn");
let win= document.querySelector(".winner-container");
let newGame = document.querySelector(".new-game");


let turnO = true;

let winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () =>{
    turnO = true;
    enableBoxs();
    win.classList.add("hide");
    newGame.classList.add("hide");
}

boxs.forEach((box) => {       
    box.addEventListener("click", () =>{
        if(turnO === true){    //player O turn
            box.innerText = "x";
            turnO = false;
        }
        else{
            box.innerText = "o";    //player X turn
            turnO =true;
        }
        box.disabled =true;
        checkWinner();
    });
});

let disableBoxs = () =>{  // for disable all boxs after winner.
    for(let box of boxs){
        box.disabled = true;
    }
}

let enableBoxs = () =>{  // for enable all boxs on new game button.
    for(let box of boxs){
        box.disabled = false;
        box.innerText = "";
    }
}

let showWinner = (winner) =>{     //for Showing Winner.
    let win = document.querySelector("#winner");
    win.innerText = `Winner is = ${winner}`;
    disableBoxs();
}


checkWinner = () => {
    for(let pattern of winPattern){   //access arrays of winPattern Array
        
        let pos1 = boxs[pattern[0]].innerText;  
        let pos2 =  boxs[pattern[1]].innerText;
        let pos3 = boxs[pattern[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);
                win.classList.remove("hide");
                newGame.classList.remove("hide");
            }
        }
    }

}
newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);