var canvas = document.getElementById("canv");
var ctx = canv.getContext('2d');
var w = canvas.width;
var h = canvas.height;
var dash = 5;
var gap = 50;

var draw = function() {
    ctx.lineWidth = 1;

    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(w/2 + gap, h/2);
    ctx.lineTo(w/2, h/2);
    ctx.lineTo(w/2, h/2 + gap * 2);
    ctx.lineTo(w/2 - gap, h/2 + gap * 2);
    ctx.lineTo(w/2 - gap, h/2);
    ctx.lineTo(w/2, h/2 - gap * 2);
    ctx.lineTo(w/2, h/2 - gap);
    ctx.arc(w/2, h/2, gap, 0, 3/2 * Math.PI, true);
    ctx.fill();
    ctx.closePath();

    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(w/2, 0);
    ctx.lineTo(w/2 + 3, 6);
    ctx.moveTo(w/2, 0);
    ctx.lineTo(w/2 - 3, 6);
    ctx.moveTo(w/2, 0);
    ctx.lineTo(w/2, h);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(w, h/2);
    ctx.lineTo(w - 6, h/2 - 3);
    ctx.moveTo(w, h/2);
    ctx.lineTo(w - 6, h/2 + 3);
    ctx.moveTo(w, h/2);
    ctx.lineTo(0, h/2);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(w/2 - dash, h/2 - gap);
    ctx.lineTo(w/2 + dash, h/2 - gap);
    ctx.moveTo(w/2 - dash, h/2 - gap * 2);
    ctx.lineTo(w/2 + dash, h/2 - gap * 2);
    ctx.moveTo(w/2 - dash, h/2 + gap);
    ctx.lineTo(w/2 + dash, h/2 + gap);
    ctx.moveTo(w/2 - dash, h/2 + gap * 2);
    ctx.lineTo(w/2 + dash, h/2 + gap * 2);
    ctx.moveTo(w/2 - gap, h/2 - dash);
    ctx.lineTo(w/2 - gap, h/2 + dash);
    ctx.moveTo(w/2 - gap * 2, h/2 - dash);
    ctx.lineTo(w/2 - gap * 2, h/2 + dash);
    ctx.moveTo(w/2 + gap, h/2 - dash);
    ctx.lineTo(w/2 + gap, h/2 + dash);
    ctx.moveTo(w/2 + gap * 2, h/2 - dash);
    ctx.lineTo(w/2 + gap * 2, h/2 + dash);
    ctx.stroke();
    ctx.closePath();

    var fontSize = gap/3;
    ctx.fillStyle = 'black';

    ctx.font = `500 ${fontSize}px Arial`;
    ctx.fillText('y', w/2 - dash * 4, 15)
    ctx.fillText('x', w - 20, h/2 - dash * 2)

    ctx.font = `500 ${fontSize}px Arial`;
    ctx.fillText("R/2", w/2 + gap, h/2 - dash * 1.3);
    ctx.fillText("R", w/2 + gap * 2, h/2 - dash * 1.3);
    ctx.fillText("-R/2", w/2 - gap, h/2 - dash * 1.3);
    ctx.fillText("-R", w/2 - gap * 2, h/2 - dash * 1.3);

    ctx.fillText("R/2", w/2 + dash * 1.3, h/2 - gap);
    ctx.fillText("R", w/2 + dash * 1.3, h/2 - gap * 2);
    ctx.fillText("-R/2", w/2 + dash * 1.3, h/2 + gap);
    ctx.fillText("-R", w/2 + dash * 1.3, h/2 + gap * 2);
}

var getMousePosition = function(e) {
    var rect = canv.getBoundingClientRect();
    var mouseX = e.offsetX * canv.width / canv.clientWidth | 0;
    var mouseY = e.offsetY * canv.height / canv.clientHeight | 0;
    return {x: mouseX, y: mouseY};
}

var parseX = function(x, r) {
    return (Math.round((x - w/2)/(gap * 2/r)*10000)/10000).toString();
}

var parseY = function(y, r) {
    return (Math.round((h/2 - y)/(gap * 2/r)*10000)/10000).toString();
}

draw();
