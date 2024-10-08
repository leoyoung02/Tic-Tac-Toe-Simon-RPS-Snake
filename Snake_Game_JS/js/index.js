import { FOOD_SOUND, GAMEOVER_SOUND, MOVE_SOUND, GAMEPLAY_SOUND } from "./constants.js";

// Variables and Constants
let inputDir = { x: 0, y: 0 };
let speed = 5;
let lastRenderedTime = 0;
let snakeArr = [
    { x: 12, y: 15 },
];
let food = { x: 5, y: 5 };
let score = 0;

// Function Declarations
function main(cTime) {
    window.requestAnimationFrame(main);
    // console.log(`Current Time: ${cTime}`);
    if ((cTime - lastRenderedTime) / 1000 < 1 / speed) {
        return;
    }
    lastRenderedTime = cTime;
    gameEngine();
}

function gameEngine() {
    // Update the snake array
    updateSnake();
    // Update the food position
    updateFoodPosition();
    let board = document.getElementById("board");
    // declared to remove any redundant items from the board
    board.innerHTML = "";
    // Display score
    document.getElementById("score").innerHTML = `Score: ${score}`;
    // Display/Render the snake in the board
    displaySnake(board);
    // Display/Render the food in the board
    displayFood(board);
}

// Function to check if snake collided with wall
function isCollide() {
    // If snake collides with its own body
    for (let index = 1; index < snakeArr.length; index++) {
        if (snakeArr[index].x === snakeArr[0].x && snakeArr[index].y === snakeArr[0].y) {
            return true;
        }
    }
    // If snake collides with the wall
    if (snakeArr[0].x < 0 || snakeArr[0].y < 0 || snakeArr[0].x > 18 || snakeArr[0].y > 18) {
        return true;
    }

    return false;
}

// Function to update snake in the board
function updateSnake() {
    // When snake collides with the wall of the board
    if (isCollide()) {
        GAMEOVER_SOUND.play();
        GAMEPLAY_SOUND.pause();
        inputDir = { x: 0, y: 0 };
        alert("You lost. Press any key to play again!");
        resetSnake();
        resetScore();
        GAMEPLAY_SOUND.play();
    } else {
        for (let index = snakeArr.length - 2; index >= 0; index--) {
            snakeArr[index + 1] = { ...snakeArr[index] };
        }

        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;
        // console.log(`Snake X: ${snakeArr[0].x} && Snake Y: ${snakeArr[0].y}`);
    }
}

// function to reset the snake 
function resetSnake() {
    snakeArr = [
        { x: 12, y: 15 },
    ];
}

// function to reset the score
function resetScore() {
    score = 0;
    document.getElementById("score").innerHTML = `Score: ${score}`;
}

// Function to display snake in the board
function displaySnake(board) {
    snakeArr.forEach((element, index) => {
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if (index === 0) {
            snakeElement.classList.add("snakeHead");
        } else {
            snakeElement.classList.add("snakeBody");
        }
        board.appendChild(snakeElement);
    });
}

// Function to update the food position in the board when snake eats it
function updateFoodPosition() {
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        FOOD_SOUND.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        // Increment the score when snake eats the food
        score += 1;
        document.getElementById("score").innerHTML = `Score: ${score}`;
        // Move the food to a new random position
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
}

// Function to display food in the board
function displayFood(board) {
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

// Main Game Process Starts Here
window.requestAnimationFrame(main);
window.addEventListener('keydown', event => { // start the game on any key down press
    GAMEPLAY_SOUND.play();
    MOVE_SOUND.play();
    switch (event.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})