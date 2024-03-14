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
import java.util.*;

@WebServlet(name="AreaCheckServlet", urlPatterns = "/check")
public class AreaCheckServlet extends HttpServlet {
    public static final int SC_UNPROCESSABLE_ENTITY = 422;


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        String rawX = req.getParameter("x");
        String rawY = req.getParameter("y");
        String rawR = req.getParameter("r");

        Result data = Result.validateAndCreate(rawX, rawY, rawR);
        processCoordsData(data, req, resp);

    }
    private void processCoordsData(Result resultData, HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext servletContext = getServletContext();

        servletContext.setAttribute("x", resultData.getX());
        servletContext.setAttribute("y", resultData.getY());
        servletContext.setAttribute("r", resultData.getR());
        servletContext.setAttribute("isHit", ((Result.isInArea(resultData.getX(), resultData.getY(), resultData.getR()))));
        servletContext.setAttribute("currTime", resultData.getCurrTime());
        servletContext.setAttribute("execTime", resultData.getExecTime());
        addToResultsCollection(resultData);

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(new Gson().toJson(resultData));



    }
    private void addToResultsCollection(Result resultData) {ServletContext servletContext = getServletContext();
    List<Result> resultsCollection = (List<Result>) servletContext.getAttribute("resultsCollection");
        if (resultsCollection == null) {
            resultsCollection = new ArrayList<Result>();
        }
        resultsCollection.add(resultData);
        servletContext.setAttribute("resultsCollection", resultsCollection);
    }



//    private void checkPoints(Result resultData, HttpServletRequest req, HttpServletResponse resp) throws IOException {
//        resp.getWriter().write();
//        var gson = new Gson();
//        Map<String, Object> json = new HashMap<>();
//        json.put("x", resultData.getX());
//        json.put("y", resultData.getY());
//        json.put("r", resultData.getR());
//        json.put("result", resultData.isInArea(resultData.getX(), resultData.getY(), resultData.getR()));
//        var msg = gson.toJson(json);
//
//        resp.setContentType("application/json");
//        resp.getWriter().write(msg);
//    }

}

//    @Override
//    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        req.getRequestDispatcher("/index.jsp").forward(req, resp);
//    }

//
//
//    private boolean checkRectangle(double x, double y, double r){
//        return (x <= 0 && y >= 0) && (x >= -r*1.8) && (y <= r);
//    }
//
//    private boolean checkTriangle(double x, double y, double r) {
//        return (x <= r && y <= r) && (y + x <= r);
//    }
//
//    private boolean checkSector(double x, double y, double r) {
//        return (x <= 0 && y <= 0) && (Math.pow(x,2) + Math.pow(y,2) <= Math.pow(r,2));
//    }
//
//    private boolean checkHit(double x, double y, double r){
//        return checkRectangle(x,y,r) || checkTriangle(x,y,r) || checkSector(x,y,r);
//    }



