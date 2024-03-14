const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");
let dynamicScalingFactor;
let width;
let height;

let hasUserInputR;
window.onload = function () {
    drawGraph(3);
    loadPoints();

}
function drawGraph(R){
    width = canvas.width;
    height = canvas.height;
    R = R*10;

    ctx.clearRect(0, 0, width, height);
    ctx.font = "15px Arial";
    let yAxisOffset = 5;

    ctx.beginPath();
    ctx.strokeStyle = 'black';

    for(let i=0; i<=width; i=i+R){
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
    }
    ctx.stroke();

    for(let i=0; i<=height; i=i+R){
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
    }
    ctx.stroke();
    ctx.closePath();

    // Рисуем главыне оси
    const xAxis = Math.round(width / 2);
    const yAxis = Math.round(height /2);
    ctx.strokeStyle = 'white';
    // Ось X
    ctx.beginPath();
    ctx.moveTo(xAxis, 0);
    ctx.lineTo(xAxis, height);

    // Ось Y
    ctx.moveTo(0, yAxis);
    ctx.lineTo(width, yAxis);
    ctx.stroke();
    ctx.closePath();

    // Треугольник
    ctx.fillStyle = "rgba(149, 0, 255, 0.158)";
    ctx.beginPath();
    ctx.moveTo(width / 2, yAxis);
    ctx.lineTo(width / 2 + 3*(R/2), width / 2);
    ctx.lineTo(width / 2, width / 2 - 3*(R/2));
    ctx.closePath();
    ctx.fill();
    ctx.closePath();
    ctx.strokeStyle = "#8D32C1";
    ctx.stroke();

    // Прямоугольник
    ctx.fillStyle = "rgba(255, 0, 238, 0.199)";
    ctx.fillRect(xAxis -3*R, yAxis - 3*(R/2), 3*R, 3*(R/2));
    ctx.strokeStyle = "rgb(255, 0, 238)";
    ctx.strokeRect(xAxis -3*R, yAxis - 3*(R/2), 3*R, 3*(R/2) );

    // Сектор
    ctx.fillStyle = "rgba(8, 0, 255, 0.244)";
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 3*(R/2), Math.PI / 2, Math.PI);
    ctx.lineTo(width / 2, height / 2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(8, 0, 255, 0.861)";
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 3*(R/2), Math.PI / 2, Math.PI);
    ctx.stroke();

    // Подписи
    ctx.fillStyle = "white";
    const labelR = hasUserInputR ? (R/10).toString() : "R";
    const labelRHalf = hasUserInputR ? ((R/10) / 2).toString() : "R/2";

    // На оси X
    ctx.fillText(labelR, width / 2 + 3*R, height / 2 - 5);
    ctx.fillText(labelRHalf, width / 2 + 3*(R/2), height / 2 - 5);
    ctx.fillText('-' + labelR, xAxis -3*R + 5, height / 2 - 5);
    ctx.fillText('-' + labelRHalf, width / 2 - 3*(R/2),height / 2 - 5);
    ctx.fillText('x', width - 15, yAxis + 20);

    // На оси Y
    ctx.fillText(labelR, width / 2 + yAxisOffset, height / 2 - 3*R);
    ctx.fillText(labelRHalf, width / 2 + yAxisOffset, height / 2 - 3*(R/2));
    ctx.fillText('-' + labelR, width / 2 + yAxisOffset, height / 2 + 3*R);
    ctx.fillText('-' + labelRHalf, width / 2 + yAxisOffset, height / 2 + 3*(R/2) );
    ctx.fillText('y', xAxis - 15, yAxis/10);
    if(hasUserInputR){
        drawAllPoints();
    }
}

function drawPoint(x, y, result) {
    let canvasX = canvas.width / 2 + x*18;
    let canvasY = canvas.width / 2 - y*14.9;
    ctx.fillStyle = result ? "#09a53d" : "#a50909";
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 3, 0, Math.PI * 2);
    ctx.fill();
    console.log('dot was drew '+ result);
}

function checkPoints(x, y, r){
    if (x <= 0 && y <= 0) {
        return (x * x + y * y) <= r * r;
    }
    // Triangle
    if (x >= 0 && y >= 0) {
        return (x <= r) && (y <= r) && (y + x <= r);
    }
    // Rectangle
    if (x <= 0 && y >= 0) {
        return (x >= -r*1.8) && (y <= r);
    }
    // Upper right corner with nothing in it
    return false;
}
async function drawAllPoints() {
    for (const point of points) {
        const isInside = checkPoints(point.x, point.y, r);
        drawPoint(point.x, point.y, isInside);
    }
}

