document.getElementById("submit_button").onclick = () => validateAndSubmit();

var validate = function(x_coord, y_coord, r_coord) {
    let flag = true;
    info = " ";
    if (x_coord != "") {
        if(parseFloat(x_coord) == x_coord) {
            if(!(parseFloat(x_coord) > -3 && parseFloat(x_coord) < 5)) {
                info += "X must be in (-3; 5)! ";
                flag = false;
            }
        }
        else {
            info += "X must be a number! ";
            flag = false;
        }
    }
    else {
        info += "Enter X! ";
        flag = false;
    }

    if (y_coord != "") {
        if(parseFloat(y_coord) == y_coord) {
            if(!(parseFloat(y_coord) > -5 && parseFloat(y_coord) < 5)) {
                info += "Y must be in (-5; 5)!";
                flag = false;
            }
        }
        else {
            info += "Y must be a number!";
            flag = false;
        }
    }
    else {
        info += "Enter Y! ";
        flag = false;
    }

    if(r_coord != "") {
        if(parseFloat(r_coord) == r_coord) {
            if(!(parseFloat(r_coord) > 2 && parseFloat(r_coord) < 5)) {
                info += "R must be in (2; 5)!";
                flag = false;
            }
        }
        else {
            info += "R must be a number!";
            flag = false;
        }
    }
    else {
        info += "Enter R! ";
        flag = false;
    }
    $(".validation_errors").html(info);
    return flag;
}

async function validateAndSubmit() {
    let x = document.querySelector(".x");
    let y = document.querySelector(".y");
    let r = document.querySelector(".r");
    if(validate(x.value, y.value, r.value)) {
        document.getElementById("form").requestSubmit();
    }
}

var clearInfo = function() {
    info = " ";
    $(".validation_errors").html(info);
}

var reset = function() {
    $('#result_table').html(`<tr>
    <th>X</th>
    <th>Y</th>
    <th>R</th>
    <th>RESULT</th>
    <th>CURRENT TIME</th>
    <th>RUNNING TIME</th>
    </tr>`);
}

canvas.addEventListener("click", (event) => {
    clearInfo();
    let r = document.querySelector(".r");
    if(r.value == "") {
        info = "Enter R!";
        $(".validation_errors").html(info);
    }
    else {
        let x = parseX(getMousePosition(event).x, r.value);
        let y = parseY(getMousePosition(event).y, r.value);
        console.log(x, y, r.value);
        document.getElementById("x").value = x;
        document.getElementById("y").value = y;
        validateAndSubmit();
    }
});
