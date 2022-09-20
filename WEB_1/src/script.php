<?php

function validate($x, $y, $r) {
    return is_numeric($x) && is_numeric($y) && is_numeric($r) && $x >= -5 && $x <= 3 && $y > -5 && $y < 3 && $r >= 1 && $r <= 5;
}

function checkFirstQuarter($x, $y, $r) {
    return $x >= 0 && $y >= 0 && $x <= $r && $y <= $r;
}

function checkSecondQuarter($x, $y, $r) {
    return $x <= 0 && $y >= 0 && $x*$x + $y*$y <= $r*$r;
}

function checkThirdQuarter($x, $y, $r) {
    return $x <= 0 && $y <= 0 && $x * 2 + $y >= -$r;
}

$x_coord = @$_GET["x"];
$y_coord = @$_GET["y"];
$r_coord = @$_GET["r"];
$response = "Miss...";

if(!validate($x_coord, $y_coord, $r_coord)) {
    http_response_code(400);
    exit("Invalid data!!!");
}

if(checkFirstQuarter($x_coord, $y_coord, $r_coord) ||
    checkSecondQuarter($x_coord, $y_coord, $r_coord) ||
    checkThirdQuarter($x_coord, $y_coord, $r_coord)){
        $response = "Hit!";
    }

$current_time = date("G:i:s", time());
$execution_time = round(microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"], 5);
echo "<tr class='columns'>";
echo "<td>" . $x_coord . "</td>";
echo "<td>" . $y_coord . "</td>";
echo "<td>" . $r_coord . "</td>";
echo "<td>" . $response  . "</td>";
echo "<td>" . $current_time  . "</td>";
echo "<td>" . $execution_time . "</td>";
echo "</tr>";

?>