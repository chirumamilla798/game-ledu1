// Game variables
const player = document.getElementById('player');
const target = document.getElementById('target');
const bullets = [];
const shootSound = document.getElementById('shootSound');
const hitSound = document.getElementById('hitSound');
let playerX = window.innerWidth / 2; // Start player in the middle
let targetX = Math.random() * (window.innerWidth - 50); // Random target position
let score = 0;

// Update player position
function updatePlayerPosition() {
  player.style.left = `${playerX}px`;
}

// Update target position
function updateTargetPosition() {
  target.style.left = `${targetX}px`;
}

// Move player left and right
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft': // Move left
      playerX -= 10;
      break;
    case 'ArrowRight': // Move right
      playerX += 10;
      break;
    case ' ': // Shoot bullet
      shootBullet();
      break;
  }
  updatePlayerPosition();
});

// Shoot bullet
function shootBullet() {
  const bullet = document.createElement('div');
  bullet.classList.add('bullet');
  bullet.style.left = `${playerX + 25}px`; // Center bullet on player
  bullet.style.bottom = '80px'; // Start bullet above player
  document.querySelector('.game-container').appendChild(bullet);
  bullets.push(bullet);
  shootSound.play();
}

// Move bullets and check for collisions
function updateBullets() {
  bullets.forEach((bullet, index) => {
    const bulletY = parseFloat(bullet.style.bottom);
    bullet.style.bottom = `${bulletY + 10}px`; // Move bullet upward

    // Check collision with target
    const bulletRect = bullet.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    if (
      bulletRect.left < targetRect.right &&
      bulletRect.right > targetRect.left &&
      bulletRect.top < targetRect.bottom &&
      bulletRect.bottom > targetRect.top
    ) {
      // Hit target
      hitSound.play();
      bullet.remove();
      bullets.splice(index, 1);
      score++;
      console.log(`Score: ${score}`);
      moveTarget();
    }

    // Remove bullet if it goes off-screen
    if (bulletY > window.innerHeight) {
      bullet.remove();
      bullets.splice(index, 1);
    }
  });
}

// Move target to a new random position
function moveTarget() {
  targetX = Math.random() * (window.innerWidth - 50);
  updateTargetPosition();
}

// Game loop
function gameLoop() {
  updateBullets();
  requestAnimationFrame(gameLoop);
}

// Initialize game
updatePlayerPosition();
updateTargetPosition();
gameLoop();