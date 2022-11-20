var x_coordinate = parseFloat(document.getElementById("x_result").textContent);
var y_coordinate = parseFloat(document.getElementById("y_result").textContent);
var r_coordinate = parseFloat(document.getElementById("r_result").textContent);
let x = w / 2 + x_coordinate * gap * 2 / r_coordinate;
let y = h / 2 - y_coordinate * gap * 2 / r_coordinate;
ctx.fillRect(x, y, gap/10, gap/10);
