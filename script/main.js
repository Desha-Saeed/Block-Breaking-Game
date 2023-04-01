const level = document.getElementById('level');
const easy = document.getElementById('easy');
const medium = document.getElementById('medium');
const difficult = document.getElementById('difficult');
var ballSpeed;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// select level and return ballSpeed
easy.addEventListener('click', function () {
    level.style = "display : none;"
    ballSpeed =10;
})
medium.addEventListener('click', function () {
    level.style = "display : none;"
    ballSpeed =15;
})
difficult.addEventListener('click', function () {
    level.style = "display : none;"
    ballSpeed =20;
})

//------------------create paddle-----------------------------
let paddleWidth = 120;
let paddleHeight = 25;
ctx.lineWidth =3;

const paddle = {
    x : canvas.width/2-paddleWidth/2 ,
    y : canvas.height - paddleHeight - 50 ,
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
drawPaddle()
