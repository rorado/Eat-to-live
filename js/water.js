// Array to store water
const water = [];

// Water image
const waterImg = new Image();
waterImg.src = "img/water.svg";

// Function to spawn new water
function spawnWater(canvasWidth) {
  water.push({
    x: Math.random() * (canvasWidth - 30),
    y: -40,
    width: 50,
    height: 50,
    speed: obgSpeed,
    caught: false,
  });
}

// Function to update water
function updateWater(waterArray, player, endGame, canvasHeight) {
  waterArray.forEach((w) => {
    w.y += w.speed;

    // Player collects water
    if (
      w.x < player.x + player.width &&
      w.x + w.width > player.x &&
      w.y + w.height > player.y &&
      w.y < player.y + player.height
    ) {
      score++;
      w.caught = true;
    }

    // Missed water → game over
    if (w.y >= canvasHeight) {
      endGame();
      updateImageIndDiv("img/water.svg", "Water is life");
      w.caught = true;
    }
  });

  // Cleanup caught water
  for (let i = waterArray.length - 1; i >= 0; i--) {
    if (waterArray[i].caught) {
      waterArray.splice(i, 1);
    }
  }
}

// Make global
window.water = water;
window.waterImg = waterImg;
window.spawnWater = spawnWater;
window.updateWater = updateWater;
