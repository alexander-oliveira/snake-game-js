let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "down";
let screenWidth = box * 16;
let screenHeight = box * 16;
let food = randomLocation();

function randomLocation(){
    return {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }
}
function setBackground(){
    context.fillStyle = "#99cc00";
    context.fillRect(0, 0, screenWidth, screenWidth);
}

function drawSnake(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "#608000";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}


function drawFood(){
    context.fillStyle = "#cc5200";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown',update);

function update(event){
    switch(event.keyCode){
        case 37:
            if(direction != "right") direction = "left";
            break;
        case 38:
            if(direction != "down") direction = "up";
            break;
        case 39:
            if(direction != "left") direction = "right";
            break;
        case 40:
            if(direction != "up") direction = "down";
            break;
    }
}

function startGame(){
    setBackground();
    drawSnake();
    drawFood();
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    for(i=1; i < snake.length; i++){
        if(snakeX == snake[i].x && snakeY == snake[i].y){
            clearInterval(game);
            alert("Game Over!");
        }
    }

    switch(direction){
        case "up":
            snakeY -= box;
            if(snakeY < 0) snakeY = screenHeight ;
            break;
        case "down":
            snakeY += box;
            if(snakeY > (screenHeight-box)) snakeY = 0; 
            break;
        case "left":
            snakeX -= box;
            if(snakeX < 0) snakeX = screenWidth;
            break;
        case "right":
            snakeX += box;
            if(snakeX > (screenWidth-box)) snakeX = 0;
            break;
    }


    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food = randomLocation();
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}
let game = setInterval(startGame, 100);