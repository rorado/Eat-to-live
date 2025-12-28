// Array to store candies
const candies = [];

const candyImg = new Image();
candyImg.src = "img/candy.png";

// Spawn candy
function spawnCandy(canvasWidth) {
  if (gameOver) return;
  candies.push({
    x: Math.random() * (canvasWidth - 40),
    y: -60,
    width: 60,
    height: 80,
    speed: obgSpeed,
    caught: false,
  });
}

// Update candies
function updateCandies(candiesArray, player, endGame, canvasHeight) {
  candiesArray.forEach((candy) => {
    candy.y += candy.speed;

    // hit player → GAME OVER
    if (
      candy.x < player.x + player.width &&
      candy.x + candy.width > player.x &&
      candy.y + candy.height > player.y &&
      candy.y < player.y + player.height
    ) {
      endGame();
      if (!player.helpActive) {
        updateImageIndDiv("img/candy.png", "Candy causes cavities");
      }

      candy.caught = true;
    }

    // remove if off screen
    if (candy.y > canvasHeight) {
      candy.caught = true;
    }
  });

  // cleanup
  for (let i = candiesArray.length - 1; i >= 0; i--) {
    if (candiesArray[i].caught) {
      candiesArray.splice(i, 1);
    }
  }
}

window.candies = candies;
window.spawnCandy = spawnCandy;
window.updateCandies = updateCandies;
window.candyImg = candyImg;
