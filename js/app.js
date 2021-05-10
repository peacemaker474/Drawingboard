const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const ctx = canvas.getContext("2d");
const saveBtn = document.getElementById("jsSave");

// 색상 및 크기 설정

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// canvas의 fill과 stroke, line default 값 설정

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// painting, filling 기본 값 설정

let painting = false;
let filling = false;

function stopPainting () {
    painting = false;
}

function onMouseMove (event) {
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

// changeColor는 외부 CSS 파일에서 설정한 값을 불러옴

function changeColor(event) {
    const bgColors = window.getComputedStyle(event.target).backgroundColor;
    ctx.strokeStyle = bgColors;
    ctx.fillStyle = bgColors;
}

function handleRangeChange(event) {
    const lineSize = event.target.value;
    ctx.lineWidth = lineSize;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick () {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleSaveClick () {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

/*

Arrow Function을 이용하여
mousedown의 startPainting 값 대체,
HTML canvas 속성 중 우클릭 이용시 contextmenu를 차단

*/

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", () => painting = true);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", (event) => event.preventDefault());
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", changeColor)
);

if (range, mode, saveBtn) {
    range.addEventListener("input", handleRangeChange);
    mode.addEventListener("click", handleModeClick);
    saveBtn.addEventListener("click", handleSaveClick);
}

// if (mode) {
//     mode.addEventListener("click", handleModeClick);
// }

// if (saveBtn) {
//     saveBtn.addEventListener("click", handleSaveClick);
// }