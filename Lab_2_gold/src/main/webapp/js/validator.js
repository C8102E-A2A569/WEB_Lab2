const formEl = document.getElementById('main_form');
// const xElement = document.querySelector('input[type=radio]:checked');
const yElement = document.getElementById('y');
const rElement = document.getElementById('r');
const btn_send = document.getElementById('btn_send');
const btn_clear = document.getElementById('btn_clear');
let xError, xValue, yValue, rValue;
const errorText = document.querySelector(".error");
let r;

function addTableAndGraph(data) {


    let parsedX = parseInt(data.x);
    let parsedY = parseFloat(data.y);
    let parsedR = parseFloat(data.r);

    drawPoint(parsedX, parsedY, data.isHit);
    // window.location.replace('http://localhost:8080/Lab_2/table.jsp');
    points.push({x: parsedX, y: parsedY, r: parsedR, result: data.isHit});
    console.log(points[points.length - 1]);


    // Update Table
    const table = document.getElementById('result_data');
    const newRow = table.insertRow();
    newRow.setAttribute('align', 'center');
    newRow.insertCell().innerText = data.x;
    newRow.insertCell().innerText = data.y;
    newRow.insertCell().innerText = data.r;
    newRow.insertCell().innerHTML = data.isHit ? "Hit" : "Fail";
    newRow.insertCell().innerText = data.currTime;
    newRow.insertCell().innerText = "0." + data.execTime;


}
function deleteTableAndGraph(data) {

    let parsedX = parseInt(data.x);
    let parsedY = parseFloat(data.y);
    let parsedR = parseFloat(data.r);

    drawPoint(parsedX, parsedY, data.isHit);

    points.push({x: parsedX, y: parsedY, r: parsedR, result: data.isHit});
    console.log(points[points.length - 1]);

    console.log('yes');
    window.location.reload();
    // location.reload();

    const table = document.getElementById('result_data');
    const newRow = table.insertRow();
    newRow.setAttribute('align', 'center');
    newRow.insertCell().innerText = data.x;
    newRow.insertCell().innerText = data.y;
    newRow.insertCell().innerText = data.r;
    newRow.insertCell().innerHTML = data.isHit ? "Hit" : "Fail";
    newRow.insertCell().innerText = data.currTime;
    newRow.insertCell().innerText = "0." + data.execTime;
}

formEl.addEventListener("submit", e => {
    e.preventDefault();
    const xVal = document.querySelector('input[name="x"]:checked');
    const yVal = document.getElementById('y');
    const rVal = document.getElementById('r');
    validateX(xVal)||validateY(yVal)||validateR(rVal);

    if(validateX(xVal)&&validateY(yVal)&&validateR(rVal)) {
        fetch("controller?" + new URLSearchParams({
            "x": xVal.value,
            "y": yVal.value.replace(",", "."),
            "r": rVal.value.replace(",", ".")
        }).toString(), {method: "get"})
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server responded with bad getaway status: ${response.status} ${response.text()}`);
            }
            console.log("response", response);
            return response.json();
        })
        .then(function (response) {
            addTableAndGraph(response);
        })
        .catch(error => {
            setErrorFor(btn_send, `There was an error processing your request from click on canvas: ${error.message}`);

        });
    }else{
        console.log("data weren't sent");
    }
})
if (document.querySelector('input[type="radio"]')) {
    document.querySelectorAll('input[type="radio"]').forEach((elem) => {
        elem.addEventListener("change", function(event) {
           validateX(elem);
        });
    });
}
yElement.addEventListener('input', function () {
    validateY(yElement);
});
// Задаем радиус графику без нажатия на кнопку отправки формы
rElement.addEventListener('input', function () {
    r = parseFloat(rElement.value.replace(",", "."));
    if (isNaN(r)) {
        r = 3; // Default R value
        hasUserInputR = false;
    } else {
        hasUserInputR = true;
    }
    if (validateR(rElement)) {
        console.log(`Drawing graph with r: ${r}`);
        drawGraph(r);

    } else {
        setErrorFor(rElement,"R not entered");
    }
});



btn_clear.addEventListener("click", e => {
    e.preventDefault();
    fetch("controller?" + new URLSearchParams({
        "clearX": 1,
        "clearY": 1,
        "clearR": 3
    }).toString(), { method: "get" })
    window.location.reload();
    let tableBody = document.getElementById('result_data');
    window.onload = function (){
        drawGraph(3);
        points = [];
        tableBody.innerHTML = '';
    }
    tableBody.innerHTML = '';
    points = [];
})

canvas.addEventListener("click", event => {
    const rElement = document.getElementById('r');
    if (!rElement || !rElement.value || isNaN(parseFloat(rElement.value))) {
        setErrorFor(rElement, "R not entered");
        return;
    }
    let xRaw = event.offsetX;
    let yRaw = event.offsetY;
    let graphX = (xRaw - canvas.width / 2) /18;
    let graphY = (canvas.height / 2 - yRaw) /14.9;
    let R = parseFloat(rElement.value);
    graphX = Math.round(graphX);
    console.log(`Raw values: X: ${xRaw}, Y: ${yRaw}, R: ${R}`);
    console.log(`Graph values: ${graphX}, ${graphY}`);

    fetch("controller?" + new URLSearchParams({
        "x": graphX,
        "y": graphY,
        "r": R
    }).toString(), { method: "get" })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server responded with bad getaway status: ${response.status} ${response.text()}`);
        }
        console.log("response", response);
        return response.json();
    })
    .then(function (response) {
        addTableAndGraph(response);
    })
    .catch(error => {
        setErrorFor(btn_send, `There was an error processing your request from click on canvas: ${error.message}`);

    });

});






// function checkArea(x, y, r){
//     // Circle of radius R
//     if (x <= 0 && y <= 0) {
//         return (x * x + y * y) <= r * r;
//     }
//     // Triangle
//     if (x >= -1 && y >= 0) {
//         return (x <= r) && (y <= r) && (2*y + 2*x <= 2*r);
//     }
//     // Rectangle
//     if (x >= -5.5 && y <= 3) {
//         return (x <= r) && (y <= 2*r);
//     }
//     // Upper right corner with nothing in it
//     return false;
// }


function validateX(xEl){
    if(xEl){
        setSuccessForX(xEl);
        // xError = xValue;
        // setErrorForX(xError, "Other fields aren't filled in");
        // if(yElement.value&&rElement.value){
        //     setSuccessForX(xValue);
        // }
        return true;
    }else{
        xError = document.querySelector("input[type=radio]");
        setErrorForX(xError, "The X value isn't selected");
        return false;
    }
}
function validateY(yEl){
    yValue = yEl.value.replace(",", ".");
    if (yValue === "") {
        setErrorFor(yElement, "Y not entered");
        return false;
    } else if (!isNumeric(yValue)) {
        setErrorFor(yElement, "Y isn't a number");
        return false;
    } else if (yValue <= -3 || yValue >= 3) {
        setErrorFor(yElement, "Y isn't within the range of acceptable values");
        return false;
    } else{
        setSuccessFor(yElement);
        return true;
    }
}
function validateR(rEl){
    rValue = rEl.value.replace(",", ".");
    if (rValue === "") {
        setErrorFor(rElement, "R not entered");

        return false;
    } else if (!isNumeric(rValue)) {
        setErrorFor(rElement, "R isn't a number");

        return false;
    } else if (rValue <= 2 || rValue >= 5) {
        setErrorFor(rElement, "R isn't within the range of acceptable values");

        return false;
    } else{
        setSuccessFor(rElement);
        return true;
    }
}
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
function setSuccessForX(input) {
    const formControl = input.parentElement.parentElement.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control success radio-span';
}
function setErrorForX(input, message) {
    const formControl = input.parentElement.parentElement.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
