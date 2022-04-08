const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const showColor = document.querySelector("#jsShowColor");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const del = document.querySelector("#jsDel");
const save = document.querySelector("#jsSave");
const saveasInput = document.querySelector("#jsName");
const saveasBtn = document.querySelector("#jsSaveas");
const randomColor = document.querySelector("#jsRandomColor");
const eraser = document.querySelector("#jsEraser");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
const WHITE_COLOR = "white";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = WHITE_COLOR;
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //처음 배경 설정이 투명으로 되어있는 버그를 수정하기 위함.
ctx.storkeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let eraserColor = WHITE_COLOR;

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16); //16777215는 hex로 ffff이므로 이 함수는 0000000부터 ffffff까지 랜덤으로 반환한다.
}
function stopPainting() {
  painting = false;
}
function startPainting(event) {
  if (event.which != 1) {
    return false;
  } else painting = true;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  showColor.style.backgroundColor = color;
}
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}
function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = "Fill";
    canvas.classList.remove("fillMode");
  } else {
    filling = true;
    mode.innerText = "Paint";
    canvas.classList.add("fillMode");
  }
}
function handleDelClick() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    eraserColor = ctx.fillStyle;
  }
}
function handleCM(event) {
  event.preventDefault();
  alert("Right Click is not available.");
}
function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}
function handleSubmitSaveas(event) {
  event.preventDefault();
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = saveasInput.value;
  saveasInput.value = "";
  link.click();
}
function handleRandomColor() {
  const color = getRandomColor();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  showColor.style.backgroundColor = color;
}
function handleEraserClick() {
  ctx.strokeStyle = eraserColor;
  showColor.style.backgroundColor = eraserColor;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("mousedown", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
if (range) {
  range.addEventListener("input", handleRangeChange);
}
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (del) {
  del.addEventListener("click", handleDelClick);
}
if (save) {
  save.addEventListener("click", handleSaveClick);
}
if (saveasInput && saveasBtn) {
  saveasBtn.addEventListener("click", handleSubmitSaveas);
}
if (randomColor) {
  randomColor.addEventListener("click", handleRandomColor);
}
if (eraser) {
  eraser.addEventListener("click", handleEraserClick);
}
