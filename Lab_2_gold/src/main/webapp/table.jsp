<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="data.Result" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Collections" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>Get Into The Area</title>
    <link class="link_icon" rel="icon" href="img/Lightning Bolt.png" type="image/png">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/table.css">
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
    <div class="container_table">
        <div class="panel_table">
            
            <table class="table">
                <tr align="center" valign="middle">   <!-- результаты --> 
                    <table  border="1"  width="100%" class="results">
                        <thead>
                            <th >X</th>
                            <th >Y</th>
                            <th >R</th>
                            <th >Result</th>
                            <th >Time</th>
                            <th >Date</th>
                        </thead>
                        <tbody id="result_data">
                        <%
                            ServletContext servletContext = request.getServletContext();
                            List<Result> results = (List<Result>) servletContext.getAttribute("resultsCollection");
                            if (results == null) {
                                results = new ArrayList<Result>();
                            }
                            Collections.reverse(results);
                        %>
                        <%
                            for (Result res : results) {
                                out.println("<tr align=\"center\">");
                                out.println("<td>" + res.x() + "</td>");
                                out.println("<td>" + res.y() + "</td>");
                                out.println("<td>" + res.r() + "</td>");
                                out.println("<td>" + Result.isInArea(res.getX(), res.getY(), res.getR()) + "</td>");
                                out.println("<td>" + res.getCurrTime() + "</td>");
                                out.println("<td>" + "0." + res.getExecTime() + "</td>");
                                out.println("</tr>");
                            }
                        %>
                        </tbody>
                    </table>
                </tr>
            </table>
            <div class="btn_box">
<%--                onclick="window.location.replace('http://localhost:8080/Lab_2/')"--%>
                <input type="button" id="returnButton" class="return_btn" value="Return" onclick="window.location.replace('http://localhost:8080/Lab_2/')">
            </div>
            
            
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

</body>
</html>