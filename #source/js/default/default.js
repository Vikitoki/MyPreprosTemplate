// Turn img to background ===========================================

const ibgBlocks = document.querySelectorAll(".ibg");

function setImgToBackground() {
  ibgBlocks.forEach((block) => {
    let image = block.querySelector("img");

    block.style.cssText = `
			background: url(${image.getAttribute("src")}) center no-repeat;
			background-size : cover;
		`;

    image.style.display = "none";
  });
}

setImgToBackground();