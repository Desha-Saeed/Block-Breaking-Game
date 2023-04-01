const level = document.getElementById('level');
const easy = document.getElementById('easy');
const medium = document.getElementById('medium');
const difficult = document.getElementById('difficult');
let life = 3;
var ballSpeed;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const BG_IMG = new Image()
BG_IMG.src = "images/main1.jpg"

// select level and return ballSpeed
easy.addEventListener('click', function () {
    level.style = "display : none;"
    ballSpeed =3;
    loop()
})
medium.addEventListener('click', function () {
    level.style = "display : none;"
    ballSpeed =4;
    loop()
})
difficult.addEventListener('click', function () {
    level.style = "display : none;"
    ballSpeed =5;
    loop()
})

//------------------loop function----------------- 
function loop() {
    ctx.drawImage(BG_IMG,0,0)
    draw()
    update()
    requestAnimationFrame(loop)
}

//------------------create paddle-----------------------------
let paddleWidth = 120;
let paddleHeight = 25;
ctx.lineWidth =3;

const paddle = {
    x : canvas.width/2-paddleWidth/2 ,
    y : canvas.height - paddleHeight - 30 ,
    width : paddleWidth ,
    height : paddleHeight ,
    dx : 5
}

function drawPaddle() {
    ctx.fillStyle = "#CC0033";
    ctx.fillRect(paddle.x,paddle.y,paddle.width,paddle.height)
    ctx.strokeStyle = "#FFFF00"
    ctx.strokeRect(paddle.x,paddle.y,paddle.width,paddle.height)
}

//-----------------controll paddle---------
let leftArrow = false;
let rightArrow = false;

// controll with Arrows
document.addEventListener('keydown',function (e) {
    if (e.keyCode == 37) {
        leftArrow = true;
    } else if(e.keyCode == 39){
        rightArrow = true;
    }
})
document.addEventListener('keyup',function (e) {
    if (e.keyCode == 37) {
        leftArrow = false;
    } else if(e.keyCode == 39){
        rightArrow = false;
    }
})
// controll with Mouse
document.addEventListener('mousemove',function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > paddleWidth/2 && relativeX + paddleWidth/2 < canvas.width) {
        paddle.x = relativeX - paddleWidth/2;
    }
  })

function movePaddle() {
    if (rightArrow && paddle.x + paddleWidth < canvas.width) {
        paddle.x += paddle.dx
    } else if(leftArrow && paddle.x>0){
        paddle.x -= paddle.dx
    }
}


//----------------create a ball-----------------
const ballRadius = 10; 

const ball = {
    x : canvas.width/2 ,
    y : paddle.y - ballRadius,
    r : ballRadius , 
    speed : 4,
    dx : 3 * (Math.random()*2 -1),
    dy : -3 
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2)
    ctx.fillStyle = "#CC0033";
    ctx.fill();
    ctx.strokeStyle = "#FFFF00";
    ctx.stroke();
    ctx.closePath();
}

//---------------move ball----------------------
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

}
//---------------Ball wall Collision----------------
function ballWallCollision() {
    if (ball.x + ball.r > canvas.width || ball.x - ball.r < 0) {
        ball.dx = - ball.dx;
    }
    if (ball.y - ball.r < 0) {
        ball.dy = - ball.dy;
    }
    if (ball.y + ball.r > canvas.height) {
        life--;
        resetball();
    }
}
//---------------resetball function------------
function resetball(){
    ball.x = canvas.width/2 ;
    ball.y = paddle.y - ballRadius;
    ball.dx = 3 * (Math.random()*2 -1) ;
    ball.dy = -3;
}
// BALL AND PADDLE COLLISION
function ballPaddleCollision(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){
        let collidePoint = ball.x - (paddle.x + paddle.width/2);
        collidePoint = collidePoint / (paddle.width/2);
        let angle = collidePoint * Math.PI/3;
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}

//----------------draw Function------------------
function draw() {
    drawPaddle()
    drawBall()
}
//----------------update function for logic------------
function update() {
    movePaddle()
    moveBall()
    ballWallCollision() 
    ballPaddleCollision()
}



