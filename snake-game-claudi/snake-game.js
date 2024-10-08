const initialFps = 5;
const fpsIncrement = 0.05; // Increase for a challenging game
const scoreIncrement = 1;
const gameWonSleepTimeout = 5000;
const gameLostSleepTimeout = 5000;
const apple_color = 'red';
const snake_color = 'green';
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const numberOfPixels = 20;
const pixelSize = canvas.width / numberOfPixels;
const maximumScore = numberOfPixels * numberOfPixels - 1;
let fps = initialFps;
let score = 1;
let direction = '';
let gameStarted = false;
let gameEnded = false;
let snake = [randomPosition()];
let apple = randomPosition();

function randomPosition() {
    return { x: Math.floor(Math.random() * numberOfPixels), y: Math.floor(Math.random() * numberOfPixels) };
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    context.fillStyle = snake_color;
    snake.forEach(function (cell) {
        context.fillRect(cell.x * pixelSize, cell.y * pixelSize, pixelSize, pixelSize);
    });
}

function drawApple() {
    let appleOverlapsSnake = true;
    while (appleOverlapsSnake) {
        appleOverlapsSnake = snake.some(cell => cell.x === apple.x && cell.y === apple.y);
        if (appleOverlapsSnake) {
            apple = randomPosition();
        }
    }

    context.fillStyle = apple_color;
    context.fillRect(apple.x * pixelSize, apple.y * pixelSize, pixelSize, pixelSize);
}

function drawMessage(message) {
    context.fillStyle = 'white';
    context.font = '30px Arial';

    const textWidth = context.measureText(message).width;
    const xCoordinate = (canvas.width - textWidth) / 2;

    context.fillText(message, xCoordinate, canvas.height / 2);
}

function drawScore() {
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText('Score: ' + score, canvas.width - 100, 30);
}

function reset(callback) {
    snake = [randomPosition()];
    apple = randomPosition();
    direction = '';
    gameStarted = false;
    gameEnded = true;
    fps = initialFps;
    score = 0;
    initializeCanvas();
    if (callback) {
        callback();
    }
}

function initializeCanvas() {
    clearCanvas();
    drawSnake();
    drawApple();
    drawMessage('Press any arrow key to start the game');
}

function updateCanvas() {
    clearCanvas();
    drawApple();
    drawSnake();
    drawScore();
}

document.addEventListener('keydown', function (event) {
    if ('ArrowUp' === event.code || 'ArrowDown' === event.code || 'ArrowRight' === event.code || 'ArrowLeft' === event.code) {
        if (!gameStarted) {
            gameStarted = true;
        }
        direction = event.code;
    }
});

function gameLoop() {
    if (gameStarted) {
        let newX = snake[0].x;
        let newY = snake[0].y;

        switch (direction) {
            case 'ArrowUp':
                newY -= 1;
                break;
            case 'ArrowDown':
                newY += 1;
                break;
            case 'ArrowLeft':
                newX -= 1;
                break;
            case 'ArrowRight':
                newX += 1;
                break;
        }

        const isMovementOutOfBounds = newX >= numberOfPixels ||
            newX < 0 ||
            newY >= numberOfPixels ||
            newY < 0;

        if (isMovementOutOfBounds) {
            drawMessage('You lost!');
            setTimeout(function () {
                reset(function () {
                    gameLoop();
                });
            }, gameLostSleepTimeout);
            return;
        } else {
            if (newX === apple.x && newY === apple.y) {
                fps += fpsIncrement;
                score += scoreIncrement;

                // Check for winning condition
                if (score === maximumScore) {
                    drawMessage('You won!');
                    setTimeout(function () {
                        reset(function () {
                            gameLoop();
                        });
                    }, gameWonSleepTimeout);
                    return;
                } else {
                    apple = randomPosition();
                }
            } else if (snake.some(cell => cell.x === newX && cell.y === newY)) {
                drawMessage('You lost!');
                setTimeout(function () {
                    reset(function () {
                        gameLoop();
                    });
                }, gameLostSleepTimeout);
                return;
            } else {
                snake.pop();
            }
            snake.unshift({ x: newX, y: newY });
            updateCanvas();
        }
    }
    setTimeout(gameLoop, 1000 / fps);
}

initializeCanvas();
gameLoop();
