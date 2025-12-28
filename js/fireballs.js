// Array to store fireballs
const fireballs = [];

// Fireball image
const fireballImg = new Image();
fireballImg.src = "img/fire.png";

// Function to spawn a fireball
function spawnFireball(canvasWidth) {
  if (score > 20) {
    fireballs.push({
      x: Math.random() * (canvasWidth - 20),
      y: -20,
      size: 20,
      speed: obgSpeed,
    });
  }
}

// Function to update fireballs
function updateFireballs(fireballsArray, player, endGame, canvasHeight) {
  fireballsArray.forEach((fb) => {
    fb.y += fb.speed;
    if (
      fb.x < player.x + player.width &&
      fb.x + fb.size > player.x &&
      fb.y < player.y + player.height &&
      fb.y + fb.size > player.y
    ) {
      endGame();
      if (!player.helpActive) {
        updateImageIndDiv("img/fire.png", "Fire is very dangerouse");
      }
    }
  });

  for (let i = fireballsArray.length - 1; i >= 0; i--) {
    if (fireballsArray[i].y > canvasHeight) fireballsArray.splice(i, 1);
  }
}

// Make them globally accessible
window.fireballs = fireballs;
window.fireballImg = fireballImg;
window.spawnFireball = spawnFireball;
window.updateFireballs = updateFireballs;
