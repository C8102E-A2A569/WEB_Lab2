
package servlets;

import data.Result;
import utils.Errors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;

import static javax.servlet.http.HttpServletResponse.SC_BAD_REQUEST;
@WebServlet(name="ControllerServlet", urlPatterns = "/controller")
public class ControllerServlet extends HttpServlet {


    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processCoordsForm(req, resp);
        checkClear(req, resp);

    }

    private void processCoordsForm(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        String rawX = req.getParameter("x");
        String rawY = req.getParameter("y");
        String rawR = req.getParameter("r");

        try {
            Result.validateAndCreate(rawX, rawY, rawR );
            getServletContext().getRequestDispatcher("/check").forward(req, resp);
        } catch (NumberFormatException e) {
            Errors.sendError(resp, SC_BAD_REQUEST, "The request sent was syntactically incorrect");
        }
    }

    private void checkClear(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getParameter("clearX") != null && req.getParameter("clearY") != null && req.getParameter("clearR") != null) {
            Result.validateAndCreate(req.getParameter("clearX"), req.getParameter("clearY"), req.getParameter("clearR") );
            getServletContext().getRequestDispatcher("/clear").forward(req, resp);
        } else {
            req.getRequestDispatcher("/index.jsp").forward(req, resp);
//            Errors.sendError(resp, SC_BAD_REQUEST, "Bad request");
        }
    }
}


