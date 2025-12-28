const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const whyDiv = document.getElementById("why");
const gmmeOverImage = document.getElementById("gmmeOverImage");
const whyOver = document.getElementById("whyOver");

// Game variables
let obgSpeed = 3;
let addObject = 1000;
let lastSpeedIncrease = 0;
let minappearTime = 500;
let maxappearTime = 1000;
let score = 0;
let maxScore = Number(localStorage.getItem("maxScore")) || 0;
let helpTimer = null;
let gameOver = false;

// Display
const scoreEl = document.getElementById("score");
const maxScoreEl = document.getElementById("maxScore");
scoreEl.textContent = score;
maxScoreEl.textContent = maxScore;

// Audio
let musicStarted = false;
const bgMusic = new Audio("audio/bg-music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.4;

const gameOverSound = new Audio("audio/gameover.mp3");

// Input setup
setupInput(() => location.reload());

if (!gameOver) {
  // --- Show start screen ---
  ctx.fillStyle = "#fff";
  ctx.font = "24px Arial";
  ctx.fillText(
    "Press any key to start",
    canvas.width / 2 - 130,
    canvas.height / 2
  );
  // --- Start game after first key press ---
  document.addEventListener("keydown", startGame, { once: true });
}

function startGame() {
  // Play music after first interaction
  bgMusic.play().catch(() => console.log("User interaction required"));
  musicStarted = true;

  loop();
  scheduleSpawns();
}

// --- Spawning objects ---
function scheduleSpawns() {
  if (gameOver) return;

  const r = Math.random() * 100;
  if (r < 30) spawnWater(canvas.width);
  else if (r >= 30 && r < 60) spawnBread(canvas.width);
  else if (r >= 60 && r < 65) spawnFireball(canvas.width);
  else if (r >= 65 && r < 68) spawnHelpObg(canvas.width);
  else if (r >= 68 && r < 75) spawnCoholic(canvas.width);
  else if (r >= 75 && r < 90) spawnCandy(canvas.width);
  else if (r >= 90 && r < 95) spawnBanana(canvas.width);
  else if (r >= 95 && r <= 100) spawnJuice(canvas.width);

  const nextSpawn = randomInt(minappearTime, maxappearTime);
  setTimeout(scheduleSpawns, nextSpawn);
}

// --- End game ---
function endGame() {
  if (gameOver) return;
  if (score > maxScore) {
    maxScore = score;
    localStorage.setItem("maxScore", maxScore);
  }

  if (!player.helpActive) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    gameOverSound.play();
    gameOver = true;
  }
}

// --- Update ---
function update() {
  if (gameOver) return;

  // Difficulty scaling
  if (score >= lastSpeedIncrease + 20) {
    if (maxappearTime > 60) maxappearTime -= 15;
    if (minappearTime > 20) minappearTime -= 15;
    obgSpeed += 0.3;
    lastSpeedIncrease = score;
  }

  movePlayer(player, leftPressed, rightPressed, canvas.width);
  updateWater(water, player, endGame, canvas.height);
  updateBread(bread, player, endGame, canvas.height);
  updateCandies(candies, player, endGame, canvas.height);
  updateCoholic(cohollics, player, endGame, canvas.height);
  updateJuices(juices, player, endGame, canvas.height);
  updateBananas(bananas, player, endGame, canvas.height);
  updateFireballs(fireballs, player, endGame, canvas.height);
  updateHelpObgs(helpObgs, player, canvas);

  scoreEl.textContent = score;
  maxScoreEl.textContent = maxScore;
}

// --- Draw ---
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  ctx.fillStyle = "#38bdf8";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Objects
  bread.forEach((o) => ctx.drawImage(breadImg, o.x, o.y, o.width, o.height));
  water.forEach((o) => ctx.drawImage(waterImg, o.x, o.y, o.width, o.height));
  candies.forEach((c) => ctx.drawImage(candyImg, c.x, c.y, c.width, c.height));
  cohollics.forEach((c) =>
    ctx.drawImage(cohollicImg, c.x, c.y, c.width, c.height)
  );
  bananas.forEach((c) => ctx.drawImage(bananaImg, c.x, c.y, c.width, c.height));
  juices.forEach((c) => ctx.drawImage(juiceImg, c.x, c.y, c.width, c.height));
  fireballs.forEach((fb) =>
    ctx.drawImage(fireballImg, fb.x, fb.y, fb.size, fb.size)
  );
  helpObgs.forEach((hb) =>
    ctx.drawImage(helpImg, hb.x, hb.y, hb.size, hb.size)
  );

  // Game over screen
  if (gameOver) {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "36px Arial";
    ctx.fillText("GAME OVER", canvas.width / 2 - 120, canvas.height / 2 - 20);
    ctx.font = "20px Arial";
    ctx.fillText(
      "Press Enter to Restart",
      canvas.width / 2 - 110,
      canvas.height / 2 + 20
    );
  }
}

// --- Game loop ---
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// --- Window globals ---
window.score = score;
window.helpTimer = helpTimer;
window.addObject = addObject;

window.musicStarted = musicStarted;
window.lastSpeedIncrease = lastSpeedIncrease;

window.gmmeOverImage = gmmeOverImage;
window.whyDiv = whyDiv;
window.whyOver = whyOver;
