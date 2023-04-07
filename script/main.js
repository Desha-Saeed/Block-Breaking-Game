const level = document.getElementById('level');
const easy = document.getElementById('easy');
const medium = document.getElementById('medium');
const difficult = document.getElementById('difficult');
let life = 3;
let ballSpeed;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const BG_IMG = new Image();
BG_IMG.src = 'images/main1.jpg';

// select level and return ballSpeed
easy.addEventListener('click', function () {
  level.style = 'display : none;';
  ballSpeed = 4;
  loop();
});
medium.addEventListener('click', function () {
  level.style = 'display : none;';
  ballSpeed = 6;
  loop();
});
difficult.addEventListener('click', function () {
  level.style = 'display : none;';
  ballSpeed = 8;
  loop();
});

//------------------create paddle-----------------------------
let paddleWidth = 120;
let paddleHeight = 25;
ctx.lineWidth = 3;

const paddle = {
  x: canvas.width / 2 - paddleWidth / 2,
  y: canvas.height - paddleHeight - 30,
  width: paddleWidth,
  height: paddleHeight,
  dx: 5,
};

function drawPaddle() {
  ctx.fillStyle = '#CC0033';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.strokeStyle = '#FFFF00';
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

//-----------------controll paddle---------
let leftArrow = false;
let rightArrow = false;

// controll with Arrows
document.addEventListener('keydown', function (e) {
  if (e.code === 'ArrowLeft') {
    leftArrow = true;
  } else if (e.code === 'ArrowRight') {
    rightArrow = true;
  }
});
document.addEventListener('keyup', function (e) {
  if (e.code === 'ArrowLeft') {
    leftArrow = false;
  } else if (e.code === 'ArrowRight') {
    rightArrow = false;
  }
});
// controll with Mouse
document.addEventListener('mousemove', function (e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (
    relativeX > paddleWidth / 2 &&
    relativeX + paddleWidth / 2 < canvas.width
  ) {
    paddle.x = relativeX - paddleWidth / 2;
  }
});

function movePaddle() {
  if (rightArrow && paddle.x + paddleWidth < canvas.width) {
    paddle.x += paddle.dx;
  } else if (leftArrow && paddle.x > 0) {
    paddle.x -= paddle.dx;
  }
}

//----------------create a ball-----------------
const ballRadius = 10;

const ball = {
  x: canvas.width / 2,
  y: paddle.y - ballRadius,
  r: ballRadius,
  speed: 4,
  dx: 4,
  dy: -4,
};

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = '#CC0033';
  ctx.fill();
  ctx.strokeStyle = '#FFFF00';
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
    ball.dx = -ball.dx;
  }
  if (ball.y - ball.r < 0) {
    ball.dy = -ball.dy;
  }
  if (ball.y + ball.r > canvas.height) {
    life--;
    resetball();
  }
}
//---------------resetball function------------
function resetball() {
  ball.x = canvas.width / 2;
  ball.y = paddle.y - ballRadius;
  ball.dx = 4;
  ball.dy = -4;
}
// BALL AND PADDLE COLLISION
function ballPaddleCollision() {
  if (
    ball.x < paddle.x + paddle.width &&
    ball.x > paddle.x &&
    paddle.y < paddle.y + paddle.height &&
    ball.y > paddle.y
  ) {
    let collidePoint = ball.x - (paddle.x + paddle.width / 2);
    collidePoint = collidePoint / (paddle.width / 2);
    let angle = (collidePoint * Math.PI) / 3;
    ball.dx = ballSpeed * Math.sin(angle);
    ball.dy = -ballSpeed * Math.cos(angle);
  }
}

//--------------------Bricks------------------

const brick = {
  row: 4,
  col: 7,

  width: 90,
  height: 30,
  offsetLeft: 20,
  offsetTop: 30,
  marginTop: 30,
  fillColor: '#270082',
  strokeColor: '#FFFFFF',
};

let bricks = [
  [0, 0],
  [0, 1],
];

// Creating the bricks array function
function createBricks() {
  for (let row = 0; row < brick.row; row++) {
    //bricks in rows
    bricks[row] = [];

    //for loop for every brick in row and columns
    for (let column = 0; column < brick.col; column++) {
      //every brick
      bricks[row][column] = {
        // x axis for every brick on columns
        x: column * (brick.width + brick.offsetLeft) + brick.offsetLeft,
        //y axis for every brick on rows
        y:
          row * (brick.height + brick.offsetTop) +
          brick.offsetTop +
          brick.marginTop,

        //state of the brick
        state: 2,
      };
    }
  }
}

createBricks();

console.log(bricks);

//Drawing the bricks on the screen

function drawBricks() {
  for (let row = 0; row < brick.row; row++) {
    for (let column = 0; column < brick.col; column++) {
      if (bricks[row][column].state === 2) {
        ctx.beginPath();
        ctx.fillStyle = brick.fillColor;
        ctx.fillRect(
          bricks[row][column].x,
          bricks[row][column].y,
          brick.width,
          brick.height
        );
        ctx.closePath();
      }
      if (bricks[row][column].state === 1) {
        ctx.beginPath();
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(
          bricks[row][column].x,
          bricks[row][column].y,
          brick.width,
          brick.height
        );
        ctx.closePath();
      }
    }
  }
}

//ball brick collision

function brickCollision() {
  for (let row = 0; row < brick.row; row++) {
    for (let column = 0; column < brick.col; column++) {
      if (bricks[row][column].state > 0) {
        if (
          ball.x + ball.r > bricks[row][column].x && //right
          ball.x - ball.r < bricks[row][column].x + brick.width && // left
          ball.y + ball.r > bricks[row][column].y && // bottom
          ball.y - ball.r < bricks[row][column].y + brick.height // top
        ) {
          // console.log(bricks[row][column]);
          //change ball direction on hit
          ball.dy = -ball.dy;

          //decrement state by 1
          bricks[row][column].state--;

          console.log(bricks[row][column].state);
        }
      }
    }
  }
}

//----------------draw Function------------------
function draw() {
  drawPaddle();
  drawBall();
  drawBricks();
}
//----------------update function for logic------------
function update() {
  movePaddle();
  moveBall();
  ballWallCollision();
  ballPaddleCollision();
  brickCollision();
}

//------------------loop function-----------------
function loop() {
  ctx.drawImage(BG_IMG, 0, 0);
  draw();
  update();
  requestAnimationFrame(loop);
}
