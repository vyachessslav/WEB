var info = " ";
if (window.localStorage.getItem("table_data") != null) {
    $("#result_table").append(window.localStorage.getItem("table_data"));
}

var validate = function(x_coord, y_coord, r_coord) {
    let flag = false;
    if(parseFloat(y_coord) == y_coord) {
        if(parseFloat(y_coord) < 3 && parseFloat(y_coord) > -5) {
            info = " ";
            flag = true;
        }
        else {
            info = "Y must be in (-5; 3)!";
        }
    }
    else {
        info = "Y must be a number!";
    }
    $(".validation_errors").html(info);
    return flag;
}

var send = function(x_coordinate, y_coordinate, r_coordinate) {
    if(validate(x_coordinate, y_coordinate, r_coordinate)){
        $.ajax({
            method: "GET",
            url: "src/script.php",
            data: {"x": x_coordinate, "y": y_coordinate, "r": r_coordinate},
            success: function(response) {
                window.localStorage.setItem("table_data", window.localStorage.getItem("table_data") + response);
                $("#result_table").append(response);
            },
            error: function(response) { 
                alert(response.responseText);
            }
        })
    }
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
    window.localStorage.removeItem("table_data");
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    var x_values = document.getElementsByName("x_coord");
    var x;
    for (var i = 0; i < x_values.length; i++) {
        if (x_values[i].checked) {
            x = x_values[i];
        }
    }
    var y = document.querySelector(".y");
    var r_values = document.getElementsByName("r_coord");
    var r;
    for (var i = 0; i < r_values.length; i++) {
        if (r_values[i].checked) {
            r = r_values[i];
        }
    }
    send(x.value, y.value, r.value);
})
