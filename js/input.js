let leftPressed = false;
let rightPressed = false;

function setupInput(gameOverCallback) {
  document.addEventListener("keydown", (e) => {
    if (gameOver) {
      if (gameOverCallback && e.key === "Enter") gameOverCallback();
    }
    if (e.key === "ArrowLeft") leftPressed = true;
    if (e.key === "ArrowRight") rightPressed = true;
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") leftPressed = false;
    if (e.key === "ArrowRight") rightPressed = false;
  });
}

window.leftPressed = leftPressed;
window.rightPressed = rightPressed;
window.setupInput = setupInput;
