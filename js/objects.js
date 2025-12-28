// Array to store bread
const bread = [];

const breadImg = new Image();
breadImg.src = "img/bread.png";

// Function to spawn a new bread
function spawnBread(canvasWidth) {
  bread.push({
    x: Math.random() * (canvasWidth - 30),
    y: -40,
    width: 50,
    height: 50,
    speed: obgSpeed,
    caught: false,
  });
}

// Function to update bread
function updateBread(breadArray, player, endGame, canvasHeight) {
  breadArray.forEach((b) => {
    b.y += b.speed;

    if (
      b.x < player.x + player.width &&
      b.x + b.width > player.x &&
      b.y + b.height > player.y &&
      b.y < player.y + player.height
    ) {
      score++;
      b.caught = true;
    }

    if (b.y >= canvasHeight) {
      endGame();
      updateImageIndDiv("img/bread.png", "Bread is a staple");
      b.caught = true;
    }
  });

  // cleanup caught bread
  for (let i = breadArray.length - 1; i >= 0; i--) {
    if (breadArray[i].caught) {
      breadArray.splice(i, 1);
    }
  }
}

// Make global
window.bread = bread;
window.breadImg = breadImg;
window.spawnBread = spawnBread;
window.updateBread = updateBread;
