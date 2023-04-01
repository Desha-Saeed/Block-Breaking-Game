const level = document.getElementById('level');
const easy = document.getElementById('easy');
const medium = document.getElementById('medium');
const difficult = document.getElementById('difficult');
var ballSpeed;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const BG_IMG = new Image()
BG_IMG.src = "images/main1.jpg"

// select level and return ballSpeed
easy.addEventListener('click', function () {
    level.style = "display : none;"
    ballSpeed =10;
    loop()
})
medium.addEventListener('click', function () {
    level.style = "display : none;"
    ballSpeed =15;
    loop()
})
difficult.addEventListener('click', function () {
    level.style = "display : none;"
    ballSpeed =20;
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

//----------------draw Function------------------
function draw() {
    drawPaddle()
}


//-----------------controll paddle---------
let leftArrow = false;
let rightArrow = false;
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
document.addEventListener('mousemove',function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > paddleWidth/2 && relativeX + paddleWidth/2 < canvas.width) {
        paddle.x = relativeX - paddleWidth/2;
    }
    console.log(e)
  })

function movePaddle() {
    if (rightArrow && paddle.x + paddleWidth < canvas.width) {
        paddle.x += paddle.dx
    } else if(leftArrow && paddle.x>0){
        paddle.x -= paddle.dx
    }
}
    

//----------------update function for logic------------
function update() {
    movePaddle()
}



