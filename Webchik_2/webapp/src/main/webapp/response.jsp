<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>

<head>
    <title>WEB_2</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <table width="100%">
        <tr>
            <th colspan="3" class="header"><h1>Laba nomer dva</h1> Zhuravlev V.E. Variant №112500</th>
        </tr>
        <tr>
            <td><canvas width="400" height="400" class="canv" id="canv"></canvas></td>
        </tr>
        <tr>
            <table id="result_table" width="100%">
                <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>RESULT</th>
                <th>CURRENT TIME</th>
                <th>RUNNING TIME (ns)</th>
                </tr>
                <tr>
                    <td id="x_result">${shot.x}</td>
                    <td id="y_result">${shot.y}</td>
                    <td id="r_result">${shot.r}</td>
                    <td id="hit_result">
                    <c:choose>
                        <c:when test="${shot.result == true}">Hit!</c:when>
                        <c:when test="${shot.result == false}">Miss...</c:when>
                    </c:choose>
                    </td>
                    <td id="currentTime_result">${shot.currentTime}</td>
                    <td id="executionTime_result">${shot.executionTime}</td>
                </tr>
            </table>
        </tr>
        <tr>
        <form method="GET" action="">
            <button>Back</button>
        </form>
        </tr>
    </table>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="risovalka.js"></script>
    <script src="printDot.js"></script>
</body>