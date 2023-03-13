function initDocument() {
    document.getElementById("coords").onmousemove = ev => changePointCoords(ev).then();
    document.getElementById("coords").onmouseup = ev => sendCoordinates(ev).then();
    document.body.onkeydown = ev => processInput(ev);
    document.getElementById("coord-form:X").addEventListener("change", () => redrawCoordinates().then());
    document.getElementById("coord-form:Y").addEventListener("change", () => redrawCoordinates().then());
    document.getElementById("coord-form:R1").addEventListener("click", () => drawPoints().then());
    document.getElementById("coord-form:R2").addEventListener("click", () => drawPoints().then());
    document.getElementById("coord-form:R3").addEventListener("click", () => drawPoints().then());
    document.getElementById("coord-form:R4").addEventListener("click", () => drawPoints().then());
    document.getElementById("coord-form:R5").addEventListener("click", () => drawPoints().then());
    redrawCoordinates().then();
    drawPoints().then();
}

async function drawPoints() {
    let greenPoints = document.getElementsByClassName("green-point");
    while (greenPoints.length > 0) {
        greenPoints[0].parentNode.removeChild(greenPoints[0]);
    }
    let redPoints = document.getElementsByClassName("red-point");
    while (redPoints.length > 0) {
        redPoints[0].parentNode.removeChild(redPoints[0]);
    }
    const rows = document.getElementById("result-table").rows;
    for (let i = 1; i < rows.length; ++i) {
        const x = Number(rows[i].cells[2].innerText);
        const y = Number(rows[i].cells[3].innerText);
        const r = getR();
        const shotStatus = rows[i].cells[5].innerText;
        if (shotStatus === "Hit!") {
            drawPoint(true, x, y, r);
        } else if (shotStatus === "Miss...") {
            drawPoint(false, x, y, r);
        }
    }
}

function drawLastPointInTable(data) {
    const rows = document.getElementById("result-table").rows;
    const shotStatus = rows[rows.length - 1].cells[5].innerText === "Hit!";
    const x = Number(rows[rows.length - 1].cells[2].innerText);
    const y = Number(rows[rows.length - 1].cells[3].innerText);
    const r = getR();
    drawPoint(shotStatus, x, y, r);
}

function drawPoint(shotStatus, x, y, r) {
    let point = shotStatus ? getGreenPoint() : getRedPoint();
    const xSVG = x * 200 / r + 300;
    const ySVG = 300 - y * 200 / r;
    point.setAttribute("cx", xSVG);
    point.setAttribute("cy", ySVG);
    const coords = document.getElementById("coords");
    coords.insertBefore(point, coords.lastElementChild);
}

function getRedPoint() {
    const redCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    redCircle.classList.add("red-point");
    redCircle.setAttribute("r", "5");
    return redCircle;
}

function getGreenPoint() {
    const greenCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    greenCircle.classList.add("green-point");
    greenCircle.setAttribute("r", "5");
    return greenCircle;
}

async function sendCoordinates(ev) {
    const fitOffsetX = ev.offsetX * 4 / 3;
    const fitOffsetY = ev.offsetY * 4 / 3;
    const r = getR();
    const x = Math.round((fitOffsetX - 300) * r / 200);
    const y = ((300 - fitOffsetY) * r / 200).toFixed(1);
    if (setX(x) && setY(y)) {
        document.getElementById("coord-form:submit-button").click();
    }
}

async function processInput(ev) {
    if (ev.code === "ArrowLeft" || ev.code === "ArrowRight") {
        let x = getX();
        if (isNaN(Number(x))) {
            x = 0;
        }
        if (ev.code === "ArrowLeft") {
            setX(Number(x) - 0.5);
        } else {
            setX(Number(x) + 0.5);
        }
    } else if (ev.code === "ArrowUp" || ev.code === "ArrowDown") {
        let y = getY();
        if (isNaN(Number(y))) {
            y = 0;
        }
        if (ev.code === "ArrowDown") {
            setY(Number(y) - 0.1);
        } else {
            setY(Number(y) + 0.1);
        }
    }
}

async function changePointCoords(ev) {
    const r = getR();
    const fitOffsetX = ev.offsetX * 4 / 3;
    const fitOffsetY = ev.offsetY * 4 / 3;
    const x = Math.round((fitOffsetX - 300) * r / 200);
    const y = ((300 - fitOffsetY) * r / 200).toFixed(1);
    redrawXCoordinate(x).then();
    redrawYCoordinate(y).then();
}

async function redrawCoordinates() {
    redrawXCoordinate(NaN).then();
    redrawYCoordinate(NaN).then();
}

async function redrawXCoordinate(x) {
    if (isNaN(x)) {
        x = getX();
    }
    const xSVG = x * 200 / getR() + 300;
    document.getElementById("real-point").setAttribute("cx", xSVG.toString());
}

async function redrawYCoordinate(y) {
    if (isNaN(y)) {
        y = getY();
    }
    const ySVG = 300 - y * 200 / getR();
    document.getElementById("real-point").setAttribute("cy", ySVG.toString());
}

function getX() {
    let radios = document.getElementsByName("coord-form:X");
    for (let i = 0; i < radios.length; ++i) {
        if (radios[i].checked === true) {
            return radios[i].value;
        }
    }
}

function getY() {
    return document.getElementById("coord-form:Y").value;
}

function getR() {
    return document.getElementById("coord-form:R").value;
}

function setX(x) {
    if (x < -3 || x > 5) {
        alert("Wrong x!");
        return false;
    }
    else {
        PF("xVar").selectValue(x);
        document.getElementById("coord-form:X").dispatchEvent(new Event("change"));
        return true;
    }
}

function setY(y) {
    if (y < -3 || y > 5) {
        alert("Wrong y!");
        return false;
    }
    else {
        const fieldY = document.getElementById("coord-form:Y");
        fieldY.value = Number(y).toFixed(1);
        fieldY.dispatchEvent(new Event("change"));
        return true;
    }
}
