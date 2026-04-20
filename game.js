// Pong Game Logic

// Game settings
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

// Create the pong paddle
const paddleWidth = 10, paddleHeight = 100;
const player = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: '#0095DD',
  score: 0
};

const opponent = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: '#0095DD',
};

// Create the pong ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 5,
  velocityX: 5,
  velocityY: 5,
  color: '#0095DD',
};

// Draw the rectangle
function drawRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

// Draw the circle
function drawArc(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

// Update game function
function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // Ball collision with top & bottom
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }

  // Ball collision with paddles
  if (ball.x - ball.radius < player.x + player.width && ball.y > player.y && ball.y < player.y + player.height) {
    ball.velocityX = -ball.velocityX;
  }

  if (ball.x + ball.radius > opponent.x && ball.y > opponent.y && ball.y < opponent.y + opponent.height) {
    ball.velocityX = -ball.velocityX;
  }

  // Update opponent paddle (AI)
  if (opponent.y + opponent.height / 2 < ball.y) {
    opponent.y += 4;
  } else {
    opponent.y -= 4;
  }

  // Reset ball if it goes out of bounds
  if (ball.x - ball.radius < 0) {
    // Add to opponent's score
    opponent.score++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    // Add to player's score
    player.score++;
    resetBall();
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = -ball.velocityX;
}

// Render the game
function render() {
  drawRect(0, 0, canvas.width, canvas.height, '#000');
  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(opponent.x, opponent.y, opponent.width, opponent.height, opponent.color);
  drawArc(ball.x, ball.y, ball.radius, ball.color);

  // Draw the scores
  ctx.fillStyle = '#FFF';
  ctx.font = '20px Arial';
  ctx.fillText(player.score, canvas.width / 4, canvas.height / 5);
  ctx.fillText(opponent.score, 3 * canvas.width / 4, canvas.height / 5);
}

// Game loop
function game() {
  update();
  render();
  requestAnimationFrame(game);
}

// Control the player's paddle
document.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  player.y = event.clientY - rect.top - player.height / 2;
});

// Start the game
game();