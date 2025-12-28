// Array to store help objects
const helpObgs = [];
// Help image
const helpImg = new Image();
helpImg.src = "img/help.svg";

// Function to spawn a help object
function spawnHelpObg(canvasWidth) {
  helpObgs.push({
    x: Math.random() * (canvasWidth - 20),
    y: -20,
    size: 50,
    speed: obgSpeed,
  });
}

// Function to update help objects
function updateHelpObgs(helpObgsArray, player, canvas) {
  helpObgsArray.forEach((hb) => {
    hb.y += hb.speed;

    if (
      hb.x < player.x + player.width &&
      hb.x + hb.size > player.x &&
      hb.y < player.y + player.height &&
      hb.y + hb.size > player.y
    ) {
      player.helpActive = true;
      player.width = canvas.width;

      if (helpTimer !== null) {
        clearTimeout(helpTimer);
      }

      helpTimer = setTimeout(() => {
        player.width = 40;
        player.x = canvas.width / 2 - 45;
        helpTimer = setTimeout(() => {
          player.helpActive = false;
        }, 150);
      }, 4000);

      helpObgsArray.splice(helpObgsArray.indexOf(hb), 1);
    }
  });

  for (let i = helpObgsArray.length - 1; i >= 0; i--) {
    if (helpObgsArray[i].y > canvas.height) helpObgsArray.splice(i, 1);
  }
}

// Make them globally accessible
window.helpObgs = helpObgs;
window.helpImg = helpImg;
window.spawnHelpObg = spawnHelpObg;
window.updateHelpObgs = updateHelpObgs;
