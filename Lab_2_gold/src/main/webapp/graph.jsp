<%--
  Created by IntelliJ IDEA.
  User: alina
  Date: 19.11.2023
  Time: 19:21
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="core" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="data.Result" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<html>
<head>
    <title>Get Into The Area</title>
</head>
<body>
<canvas class="graph" id="graphCanvas" width="300" height="300"></canvas>
<script>
    let points = [];

    function loadPoints() {
        points = [
            <%
                ServletContext servletContext = request.getServletContext();
                List<Result> results = (List<Result>) servletContext.getAttribute("resultsCollection");
                if (results == null) {
                    results = new ArrayList<Result>();
                }

                for (Result res : results) {
            %>
            {
                x: <%=res.getX()%>,
                y: <%=res.getY()%>,
                r: <%=res.getR()%>,
                isHit: <%=Result.isInArea(res.getX(), res.getY(), res.getR()) ? "true" : "false"%>
            },
            <% } %>

        ];
        console.log(points);
        // Remove the last comma to make it a valid array if needed
        if (points.length > 0) {
            points = points.slice(0, -1);
        }
    }
</script>

</body>
</html>
