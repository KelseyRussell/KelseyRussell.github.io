// setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if ((this.x + this.size) >= width) this.velX = -(this.velX);
    if ((this.x - this.size) <= 0) this.velX = -(this.velX);
    if ((this.y + this.size) >= height) this.velY = -(this.velY);
    if ((this.y - this.size) <= 0) this.velY = -(this.velY);

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball) {
        const ballx = this.x - ball.x;
        const bally = this.y - ball.y;
        const distance = Math.sqrt(ballx * ballx + bally * bally);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();


        //sourced from Wikipedia (https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional), stack over flow (https://stackoverflow.com/questions/60727534/balls-bouncing-off-of-each-other
//), chat GPT   
          const angle = Math.atan2(bally, ballx);
          const speed1 = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
          const speed2 = Math.sqrt(ball.velX * ball.velX + ball.velY * ball.velY);

          const direction1 = Math.atan2(this.velY, this.velX);
          const direction2 = Math.atan2(ball.velY, ball.velX);

          const newVelX1 = speed1 * Math.cos(direction1 - angle);
          const newVelY1 = speed1 * Math.sin(direction1 - angle);
          const newVelX2 = speed2 * Math.cos(direction2 - angle);
          const newVelY2 = speed2 * Math.sin(direction2 - angle);

          const finalVelX1 = ((this.size - ball.size) * newVelX1 + (2 * ball.size) * newVelX2) / (this.size + ball.size);
          const finalVelX2 = ((ball.size - this.size) * newVelX2 + (2 * this.size) * newVelX1) / (this.size + ball.size);

          this.velX = Math.cos(angle) * finalVelX1 + Math.cos(angle + Math.PI / 2) * newVelY1;
          this.velY = Math.sin(angle) * finalVelX1 + Math.sin(angle + Math.PI / 2) * newVelY1;

          ball.velX = Math.cos(angle) * finalVelX2 + Math.cos(angle + Math.PI / 2) * newVelY2;
          ball.velY = Math.sin(angle) * finalVelX2 + Math.sin(angle + Math.PI / 2) * newVelY2;
        }
      }
    }
  }
}

const balls = [];
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();