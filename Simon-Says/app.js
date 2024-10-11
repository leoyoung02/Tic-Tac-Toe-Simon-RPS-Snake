let gameseq = [];
let userseq = [];
let isStart = false;
let level = 0;
let highScore = 0; // Variable to store high score for the current session
let btn = ['yellow', 'green', 'red', 'blue'];

function flash(button) {
    button.classList.add("flash");
    setTimeout(() => {
        button.classList.remove("flash");
    }, 250);
}

function randGenerator() {
    return Math.floor(Math.random() * 4);
}

function levelUp() {
    userseq = [];
    level++;
    let subtitle = document.querySelector('.subtitle');
    subtitle.innerText = `Level ${level}`;
    let btnindx = randGenerator();
    let randbtn = btn[btnindx];
    gameseq.push(randbtn);
    console.log(gameseq);
    let button = document.querySelector(`.${randbtn}`);
    flash(button);
}

function btnpress() {
    flash(this);
    let color = this.getAttribute('id');
    userseq.push(color);
    console.log(userseq);
    checkAns(userseq.length - 1);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000); // Proceed to the next level after a short delay
        }
    } else {
        reset(); // Reset the game if the user sequence is incorrect
    }
}

function setupButtonListeners() {
    let btns = document.querySelectorAll('.button');
    for (let button of btns) {
        button.addEventListener('click', btnpress);
    }
}

function reset() {
    let subtitle = document.querySelector('.subtitle');
    subtitle.innerText = `Game Over! Please Try Again`;
    gameseq = [];
    userseq = [];
    if (level > highScore) {
        highScore = level;
        updateHighScoreDisplay(highScore);
    }
    level = 0;
    isStart = false;
}

function updateHighScoreDisplay(score) {
    let highScoreDisplay = document.querySelector('.high-score');
    highScoreDisplay.innerText = `High Score: ${score}`;
}

document.addEventListener('keypress', (event) => {
    if (!isStart) {
        isStart = true;
        console.log(event.key);
        levelUp();
        setupButtonListeners(); // Set up button listeners when the game starts
    }
});
