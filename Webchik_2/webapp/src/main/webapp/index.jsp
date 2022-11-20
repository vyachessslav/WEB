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
            <td width= "70%">
                <img src="images/kazino4.jpg">
                <img src="images/kazino5.jpg">
            </td>
            <td width= "30%">
                <table>
                    <tr>
                        <td colspan="2">
                            <img src="images/kazino1.jpg">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <img src="images/kazino3.jpg">
                        </td>
                    </tr>
                    <tr>
                        <td width = 50%>
                            <canvas class="canvas" id="canv" width = "300px" height = "300px"></canvas>
                        </td>
                        <td width = 50%>
                            <form id="form" action="" method="POST">
                                <span>Enter Х value<br>
                                    <input type="text" name="x_coordinate" id="x" class="x" maxlength="16" placeholder="from -3 to 5"><br>
                                </span>
                                <span>Enter Y value<br>
                                    <input type="text" name="y_coordinate" id="y" class="y" maxlength="16" placeholder="from -5 to 5"><br>
                                </span>
                                <span>Enter R value<br>
                                    <input type="text" name="r_coordinate" id="r" class="r" maxlength="16" placeholder="from 2 to 5"><br>
                                </span>
                                <span>
                                    <input type="reset" value="Reset"/>
                                </span>
                            </form>
                            <button id="submit_button" class="submit_button">Submit</button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span class="validation_errors"> <br></span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <button type="reset" id="pomoika" onclick="reset()">
                                <img src="images/pomoika.jpg">
                            </button>
                        </td>
                    </tr>
                </table>
            </td>
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
                <c:forEach var="shot" items="${shots.history}">
                    <tr>
                        <td>${shot.x}</td>
                        <td>${shot.y}</td>
                        <td>${shot.r}</td>
                        <td>
                        <c:choose>
                            <c:when test="${shot.result == true}">Hit!</c:when>
                            <c:when test="${shot.result == false}">Miss...</c:when>
                        </c:choose>
                        </td>
                        <td>${shot.currentTime}</td>
                        <td>${shot.executionTime}</td>
                    </tr>
                </c:forEach>
            </table>
        </tr>

    </table>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="risovalka.js"></script>
    <script src="jopaskrip.js"></script>
</body>