// Array to store bananas
const bananas = [];

// Banana image
const bananaImg = new Image();
bananaImg.src = "img/banana.svg";

function spawnBanana(canvasWidth) {
  if (gameOver) return;

  bananas.push({
    x: Math.random() * (canvasWidth - 40),
    y: -60,
    width: 60,
    height: 80,
    speed: obgSpeed,
    caught: false,
  });
}

// Update bananas
function updateBananas(bananasArray, player, endGame, canvasHeight) {
  bananasArray.forEach((banana) => {
    banana.y += banana.speed;

    // hit player → increase score
    if (
      banana.x < player.x + player.width &&
      banana.x + banana.width > player.x &&
      banana.y + banana.height > player.y &&
      banana.y < player.y + player.height
    ) {
      score += 2;
      banana.caught = true;
    }

    if (banana.y > canvasHeight) {
      banana.caught = true;
    }
  });

  for (let i = bananasArray.length - 1; i >= 0; i--) {
    if (bananasArray[i].caught) {
      bananasArray.splice(i, 1);
    }
  }
}

// Export to window
window.bananas = bananas;
window.spawnBanana = spawnBanana;
window.updateBananas = updateBananas;
window.bananaImg = bananaImg;
