const gameboard = document.querySelector('#gameboard');
const scoreVal = document.querySelector('#scoreVal');
const context = gameboard.getContext('2d');
const reStartBtn = document.getElementById('restart-btn');

const WIDTH = gameboard.width;
const HEIGHT = gameboard.height;
const UNIT = 25;

let foodX;
let foodY;
let xVel = UNIT;
let yVel = 0;
let score = 0;

let active = true;
let started = false;
let playPasue = true;
let Speed = 200;

let snake = [
    { x: UNIT * 3, y: 0 },
    { x: UNIT * 2, y: 0 },
    { x: UNIT, y: 0 },
    { x: 0, y: 0 }
]

window.addEventListener('keydown', keyPress);
startGame();

function startGame() {
    context.fillStyle = '#212121'
    context.fillRect(0, 0, WIDTH, HEIGHT);

    createFood();
    displayFood();
    drawSnake();
}


function createFood() {

    foodX = Math.floor(Math.random() * (WIDTH / UNIT)) * UNIT
    foodY = Math.floor(Math.random() * HEIGHT / UNIT) * UNIT

    // console.log(foodX, foodY)

}

function displayFood() {
    // clearBorad();

    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, UNIT, UNIT)
    // context.roundRect(foodX, foodY, UNIT, UNIT, [50, 50, 50, 50]);
    context.fill();

}

function clearFood() {

    context.fillStyle = '#212121';
    // context.roundRect(foodX, foodY, UNIT, UNIT, [50, 50, 50, 50]);
    // context.roundRect(foodX, foodY, UNIT, UNIT);
    context.fill();
    context.fillRect(foodX, foodY, UNIT, UNIT)

    context.fillStyle = '#212121';
    context.fillRect(foodX, foodY, UNIT, UNIT)
    // context.clearRect(foodX, foodY, UNIT, UNIT);
}

function drawSnake() {
    context.fillStyle = 'aqua';
    context.strokeStyle = '#212121';

    snake.forEach(snakePart => {
        context.fillRect(snakePart.x, snakePart.y, UNIT, UNIT)
        context.strokeRect(snakePart.x, snakePart.y, UNIT, UNIT)
    })

    // context.fillStyle='#16d0fe'
    // context.fillRect(snake[0].x, snake[0].y, UNIT, UNIT)
    // context.strokeRect(snake[0].x, snake[0].y, UNIT, UNIT)
}

function moveSnake() {
    const head = { x: snake[0].x + xVel, y: snake[0].y + yVel };
    snake.unshift(head);

    // context.fillStyle='red'
    // context.fillRect(snake[0].x, snake[0].y, UNIT, UNIT)

    if (snake[0].x == foodX && snake[0].y == foodY) {


        createFood();
        score++;
        scoreVal.textContent = score

        if (score >= 35) {
            Speed = 50;
        }
        else if (score >= 25) {
            Speed = 85;
        }
        else if (score >= 10) {
            Speed = 110;
        }
    }
    else {
        snake.pop();
    }

}

function clearBorad() {
    // context.fillStyle = 'black';
    context.fillStyle = '#212121'
    context.fillRect(0, 0, WIDTH, HEIGHT);
    clearFood();
}



function nextTick() {
    if (active) {
        setTimeout(() => {
            clearBorad();
            displayFood();

            moveSnake();
            drawSnake();
            checkGameOver();

            if (playPasue) {
                nextTick();
            }

        }, Speed)
    }
    else {
        clearBorad();
        context.font = "bold 50px Serif"
        context.textAlign = "center"
        context.fillStyle = "white"
        context.fillText("Game Over !!", WIDTH / 2, HEIGHT / 2);
        // reStartStyle();
        reStartBtn.setAttribute('id', 'restart-display');
    }

}

function keyPress(event) {
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWNN = 40;
    const SPACE = 32;

    if (!started) {
        started = true;
        nextTick();
    }
    switch (true) {
        case (event.keyCode == LEFT || event == LEFT  && xVel != UNIT):
            xVel = -UNIT;
            yVel = 0;
            break;
        case (event.keyCode == UP || event == UP && yVel != UNIT):
            yVel = -UNIT;
            xVel = 0;
            break;
        case (event.keyCode == RIGHT || event == RIGHT && xVel != -UNIT):
            xVel = UNIT;
            yVel = 0;
            break;
        case (event.keyCode == DOWNN || event == DOWNN && yVel != -UNIT):
            yVel = UNIT;
            xVel = 0;
            break;
        case (event.keyCode == SPACE):
            if (playPasue)
                playPasue = false;
            else
                playPasue = true;
            nextTick();
            break;
    }
}

function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
        case (snake[0].y < 0):
        case (snake[0].x >= 500):
        case (snake[0].y >= 500):
            active = false;
            break;
    }
}

// function reStartStyle() {
//     // reStartBtn.style.display = 'block';
   
// }

// reStartBtn.addEventListener('Onclick',reStart);

function reStartGame() {
    reStartBtn.removeAttribute('id');
    snake = [
        { x: UNIT * 3, y: 0 },
        { x: UNIT * 2, y: 0 },
        { x: UNIT, y: 0 },
        { x: 0, y: 0 }
    ]


    active = true;
    started = false;
    playPasue = true;
    Speed = 200;

    score = 0;

    clearBorad();
    startGame();
  
    // reStartBtn.removeAttribute('id','restart-display');
}

function arrowUp(){
    keyPress(38);
}

function arrowLeft(){
    keyPress(37);
}

function arrowRight(){
    keyPress(39);
}

function arrowDown(){
    keyPress(40);
}
