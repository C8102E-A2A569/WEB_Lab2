
package servlets;

import com.google.gson.Gson;
import data.Result;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/clear")
public class ClearTableServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String rawX = req.getParameter("clearX");
        String rawY = req.getParameter("clearY");
        String rawR = req.getParameter("clearR");

        Result data = Result.validateAndCreate(rawX, rawY, rawR);
        processCoordsData(data, req, resp);
    }
    private void processCoordsData(Result resultData, HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext servletContext = getServletContext();

        servletContext.setAttribute("resultX", resultData.getX());
        servletContext.setAttribute("resultY", resultData.getY());
        servletContext.setAttribute("resultR", resultData.getR());
        servletContext.setAttribute("resultHit", (Result.isInArea(resultData.getX(), resultData.getY(), resultData.getR())));
        servletContext.setAttribute("resultCurrTime", resultData.getCurrTime());
        servletContext.setAttribute("resultExecTime", resultData.getExecTime());
        clearResults();

//        resp.setContentType("application/json");
//        resp.setCharacterEncoding("UTF-8");
//        resp.getWriter().write(new Gson().toJson(resultData));

    }
    private void clearResults(){
        ServletContext servletContext = getServletContext();
        List<Result> resultsCollection = (List<Result>) servletContext.getAttribute("resultsCollection");
        if (resultsCollection == null) {
            resultsCollection = new ArrayList<>();
        }
        resultsCollection.clear();
        servletContext.setAttribute("resultsCollection", resultsCollection);

    }

}