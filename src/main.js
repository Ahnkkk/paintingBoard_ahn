"use strict";

//initial setting
const canvas = document.querySelector('#jsCanvas');
canvas.width = 700;
canvas.height = 700;

const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;
ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);

let painting = false;
let filling = false;

canvasController();
handleRange();
handleModeClick();
handleSaveClick();
handleColorClick();
handleClearClick();

//Canvas Controller
function canvasController() {
    if(canvas){
        canvas.addEventListener('mousemove',event => onMouseMove(event));
        canvas.addEventListener('mousedown',() => startPainting());
        canvas.addEventListener('mouseup', () => stopPainting());
        canvas.addEventListener('mouseleave', () => stopPainting());
        //Canvas 우클릭방지
        canvas.addEventListener('contextmenu', event => {event.preventDefault();});
        //fillCanvas
        canvas.addEventListener('click',() =>{
            if(filling){
                ctx.fillRect(0,0,canvas.width,canvas.height);
            }
        });
    }
}

//Mouse move to Canvas
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    //console.log(x,y);
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

//startPainting
function startPainting() {
    painting = true;
}

//stopPainting
function stopPainting() {
    painting = false;
}

//handleRange
function handleRange() {
    const range = document.querySelector('#jsRange');
    if(range){
        range.addEventListener('input',event => {
           //console.log(event.target);
           //console.log(event.target.value);
           const size = event.target.value;
           ctx.lineWidth = size;
        });
    }
}

//handleModeClick
function handleModeClick() {
    const mode = document.querySelector('#jsMode');
    if(mode){
        mode.addEventListener('click',() => {
            if(filling === true){
                filling = false;
                mode.innerText = "Fill";
            }else{
                filling = true;
                mode.innerText = "Paint";
            }
        });
    }
}

//handleSaveClick
function handleSaveClick() {
    const saveBtn = document.querySelector('#jsSave');

    if(saveBtn){
        saveBtn.addEventListener('click',() =>{
            const imageName = prompt('파일이름 : ');
            if(!imageName){return;}
            const image = canvas.toDataURL();
            const link = document.createElement('a');
            link.href = image;
            link.download = imageName;
            link.click();
        });
    }
}

//handleColorClick
function handleColorClick() {
    const colors = document.getElementsByClassName('jsColor');
    Array.from(colors).forEach(color =>
        color.addEventListener('click', event => {
           const color = event.target.style.backgroundColor;
           ctx.strokeStyle = color;
           ctx.fillStyle = color;
        }));
}

//handleClearClick
function handleClearClick() {
    const clear = document.querySelector('#jsClear');
    clear.addEventListener('click',() => {
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,canvas.width,canvas.height);
    });
}



