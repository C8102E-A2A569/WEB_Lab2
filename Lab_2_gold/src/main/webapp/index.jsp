<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="data.Result" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Get Into The Area</title>
    <link class="link_icon" rel="icon" href="img/Lightning Bolt.png" type="image/png">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500&family=Tektur:wght@400;700&family=Unbounded:wght@200;400&display=swap" rel="stylesheet">
</head>
<body>
<video src="css/gradient.mp4" autoplay loop muted></video>
<header class="header">
    <div class="container1">
        <div class="header__top">
            <a href="#" class="logo">
                <img src="img/Lightning Bolt.svg" alt="">
            </a>

            <nav class="menu">
                <ul class="menu__list">
                    <li class="muni__item">
                        <a href="https://se.ifmo.ru/courses/web#labs" class="menu__ilnk">Task Description</a>
                    </li>
                    <li class="muni__item">
                        <a href="https://www.youtube.com/watch?v=VKMw2it8dQY&list=PLHO_rPz6wScCYMw8S4rR2gQfwNtnle4EH&index=88" class="menu__ilnk">Romanova Alina P3207 17116</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</header>
<div class="container2">
    <div class="panel">
        <div class="graphBox">
            <jsp:include page="graph.jsp" />
<%--            <canvas class="graph" id="graphCanvas" width="300" height="300"></canvas>--%>
        </div>
        <div class="forms">
            <form id="main_form">
                <h1>Get into the area</h1>
                <div class="form-control">
                    <label>Coordinate X</label>
                    <div class="radios">
                        <label class="radio">
                            <input type="radio" value="-5" name="x">
                            -5
                            <span class="span"></span>
                        </label>
                        <label class="radio">
                            <input type="radio" value="-4" name="x">
                            -4
                            <span class="span"></span>
                        </label>
                        <label class="radio">
                            <input type="radio" value="-3" name="x">
                            -3
                            <span class="span"></span>
                        </label>
                        <label class="radio">
                            <input type="radio" value="-2" name="x">
                            -2
                            <span class="span"></span>
                        </label>
                        <label class="radio">
                            <input type="radio" value="-1" name="x">
                            -1
                            <span class="span"></span>
                        </label>
                        <label class="radio positive">
                            <input type="radio" value="0" name="x">
                            0
                            <span class="span"></span>
                        </label>
                        <label class="radio positive">
                            <input type="radio" value="1" name="x">
                            1
                            <span class="span"></span>
                        </label>
                        <label class="radio positive">
                            <input type="radio" value="2" name="x">
                            2
                            <span class="span"></span>
                        </label>
                        <label class="radio positive">
                            <input type="radio" value="3" name="x">
                            3
                            <span class="span"></span>
                        </label>
                        <small>Error message</small>
                        <!-- <i class='bx bxs-check-circle'></i> -->
                    </div>


                </div>
                <div class="form-control">
                    <label for="y">Coordinate Y</label>
                    <input type="text" placeholder="(-3;3)" id="y" name="y" maxlength="5" >
                    <!-- <i class='bx bxs-check-circle'></i>
                    <i class='bx bxs-error-circle'></i> -->
                    <small>Error message</small>
                </div>
                <div class="form-control">
                    <label for="r">Coordinate R</label>
                    <input type="text" placeholder="(2;5)" id="r" name="r"  maxlength="5" >
                    <!-- <i class='bx bxs-check-circle'></i>
                    <i class='bx bxs-error-circle'></i> -->
                    <small>Error message</small>
                </div>
                <div class="form-control">
                    <input  type="submit" value="Send" id="btn_send">
                    <small class="small_btn_send">Error message</small>
                </div>
                <input class="clear-form" type="submit" value="Clear table" id="btn_clear">
            </form>
        </div>
        
    </div>
    <div class="container_table_index">

            <table class="table">
                <tr align="center" valign="middle">   <!-- результаты --> 
                    <table  border="1"  width="100%" class="results">
                        <thead>
                            <th >X</th>
                            <th >Y</th>
                            <th >R</th>
                            <th >Result</th>
                            <th >Time</th>
                            <th >ExecTime</th>
                        </thead>
                        <tbody id="result_data">
                            <%
                                ServletContext servletContext = request.getServletContext();
                                List<Result> results = (List<Result>) servletContext.getAttribute("resultsCollection");
                                if (results == null) {
                                    results = new ArrayList<Result>();
                                }
                            %>
                            <%
                                for (Result res : results) {
                                  out.println("<tr align=\"center\">");
                                  out.println("<td>" + res.getX() + "</td>");
                                  out.println("<td>" + res.getY() + "</td>");
                                  out.println("<td>" + res.getR() + "</td>");
                                  out.println("<td>" + (Result.isInArea(res.getX(), res.getY(), res.getR()) ? "Hit" : "Fail") + "</td>");
                                  out.println("<td>" + res.getCurrTime() + "</td>");
                                  out.println("<td>" + "0." + res.getExecTime() + "</td>");
                                  out.println("</tr>");
                                }
                              %>
                        </tbody>
                    </table>
                </tr>
            </table>
    </div>


</div>
<footer class="footer">
    <div class="container1">

        <div  class="footer_main">
            <ul>
                <li><a href="https://t.me/theEternalObserver">Telegram</a></li>
            </ul>
        </div>

    </div>
</footer>
<script src="js/graph.js"></script>
<script src="js/validator.js"></script>




</body>
</html>