const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const eraser = document.querySelector("#eraser");
const penColors = document.querySelector("#colors").children;

let penWidth = 10;
let isPainting;
let eraserEnabled = false;
let last;
let colorSet = {
  skin: "rgb(64,128,0)",
  flesh: "rgb(255,128,128)",
  seed: "rgb(32, 32, 16)",
};

canvas.width = document.querySelector("#root").clientWidth;
canvas.height = document.documentElement.clientHeight;

ctx.fillStyle = colorSet.skin;
ctx.strokeStyle = colorSet.flesh;
ctx.lineWidth = 8;
ctx.lineCap = "round";

canvas.onmousedown = (e) => {
  console.log("startPath", e);
  isPainting = true;
  saveLast(e.clientX, e.clientY);
};
canvas.onmousemove = (e) => {
  if (isPainting) {
    if (eraserEnabled) {
      console.log("using eraser");
      usingEraser(e);
    } else {
      console.log("movePath");
      drawLine(last[0], last[1], e.clientX, e.clientY);
      saveLast(e.clientX, e.clientY);
    }
  }
};
canvas.onmouseup = (e) => {
  console.log("endPath");
  isPainting = false;
};

const drawLine = (lastX, lastY, x, y) => {
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.stroke();
};

const saveLast = (x, y) => {
  last = [x, y];
};

const switchColor = (color) => {
  eraserEnabled = false;
  if (color) {
    ctx.strokeStyle = colorSet[color];
  }
  addActive();
};

eraser.onclick = (e) => {
  eraserEnabled = !eraserEnabled;
  console.log("eraserEnabled now:", eraserEnabled);
};

const usingEraser = (e) => {
  ctx.clearRect(e.clientX - penWidth / 2, e.clientY - penWidth / 2, 20, 20);
};

// TODO: first click make no effect
const addActive = () => {
  [...penColors].forEach((pen) => {
    pen.classList.remove("active");
    pen.addEventListener("click", (e) => {
      e.target.classList.add("active");
    });
  });
};
