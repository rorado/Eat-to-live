// Array to store cohollics
const cohollics = [];

// Image for cohollic
const cohollicImg = new Image();
cohollicImg.src = "img/cohol.svg";

// Spawn cohollic
function spawnCoholic(canvasWidth) {
  if (gameOver) return;

  cohollics.push({
    x: Math.random() * (canvasWidth - 40),
    y: -70,
    width: 60,
    height: 80,
    speed: obgSpeed,
    caught: false,
  });
}

// Update cohollics
function updateCoholic(cohollicsArray, player, endGame, canvasHeight) {
  cohollicsArray.forEach((coholic) => {
    coholic.y += coholic.speed;

    // hit player → GAME OVER
    if (
      coholic.x < player.x + player.width &&
      coholic.x + coholic.width > player.x &&
      coholic.y + coholic.height > player.y &&
      coholic.y < player.y + player.height
    ) {
      endGame();
      if (!player.helpActive) {
        updateImageIndDiv("img/cohol.svg", "IS HARAM");
      }
      coholic.caught = true;
    }

    if (coholic.y > canvasHeight) {
      coholic.caught = true;
    }
  });

  // cleanup
  for (let i = cohollicsArray.length - 1; i >= 0; i--) {
    if (cohollicsArray[i].caught) {
      cohollicsArray.splice(i, 1);
    }
  }
}

// Make global
window.cohollics = cohollics;
window.spawnCoholic = spawnCoholic;
window.updateCoholic = updateCoholic;
window.cohollicImg = cohollicImg;
