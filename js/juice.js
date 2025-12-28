// Array to store juices
const juices = [];

// Juice image
const juiceImg = new Image();
juiceImg.src = "img/juice.svg";

// Spawn juice
function spawnJuice(canvasWidth) {
  if (gameOver) return;

  juices.push({
    x: Math.random() * (canvasWidth - 40),
    y: -60,
    width: 60,
    height: 80,
    speed: obgSpeed,
    caught: false,
  });
}

// Update juices
function updateJuices(juicesArray, player, endGame, canvasHeight) {
  juicesArray.forEach((juice) => {
    juice.y += juice.speed;

    // hit player → GAME OVER
    if (
      juice.x < player.x + player.width &&
      juice.x + juice.width > player.x &&
      juice.y + juice.height > player.y &&
      juice.y < player.y + player.height
    ) {
      score += 5;
      juice.caught = true;
    }

    // remove if off screen
    if (juice.y > canvasHeight) {
      juice.caught = true;
    }
  });

  // cleanup
  for (let i = juicesArray.length - 1; i >= 0; i--) {
    if (juicesArray[i].caught) {
      juicesArray.splice(i, 1);
    }
  }
}

window.juices = juices;
window.spawnJuice = spawnJuice;
window.updateJuices = updateJuices;
window.juiceImg = juiceImg;
