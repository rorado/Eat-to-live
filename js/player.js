const player = {
  x: 250 - 30,
  y: 600 - 50,
  width: 40,
  height: 20,
  speed: 10,
  helpActive: false,
};

function movePlayer(playerObj, leftPressed, rightPressed, canvasWidth) {
  if (leftPressed) playerObj.x -= playerObj.speed;
  if (rightPressed) playerObj.x += playerObj.speed;
  if (playerObj.x < 0) playerObj.x = 0;
  if (playerObj.x + playerObj.width > canvasWidth)
    playerObj.x = canvasWidth - playerObj.width;
}

window.player = player;
window.movePlayer = movePlayer;
