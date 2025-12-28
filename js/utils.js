function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateImageIndDiv(newSrc, whyOvercontent) {
  whyDiv.style.display = "flex";
  whyOver.textContent = " " + whyOvercontent + "  💀";
  gmmeOverImage.src = newSrc;
  setTimeout(() => {
    whyDiv.style.display = "none";
  }, 5000);
}

window.randomInt = randomInt;
window.updateImageIndDiv = updateImageIndDiv;
