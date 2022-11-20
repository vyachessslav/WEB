package webapp.controllers;

import webapp.beans.Shot;
import webapp.beans.ShotHistory;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.TimeUnit;

@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        getServletContext().setAttribute("shots", new ShotHistory());
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendRedirect("");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html; charset=utf-8");
        long startTime = System.nanoTime();
        float x = Float.parseFloat(req.getParameter("x_coordinate"));
        float y = Float.parseFloat(req.getParameter("y_coordinate"));
        float r = Float.parseFloat(req.getParameter("r_coordinate"));
        boolean result = checkFirstQuarter(x, y, r) || checkSecondQuarter(x, y, r) || checkThirdQuarter(x, y, r);
        OffsetDateTime currentTimeObject = OffsetDateTime.now(ZoneOffset.UTC);
        String currentTime = currentTimeObject.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        String executionTime = String.valueOf(System.nanoTime() - startTime);
        Shot shot = new Shot(x, y, r, result, currentTime, executionTime);
        ServletContext servletContext = getServletContext();
        Object shotHistory = servletContext.getAttribute("shots");
        if (shotHistory instanceof ShotHistory shots) {
            shots.addShot(shot);
        } else {
            ShotHistory shots = new ShotHistory();
            shots.addShot(shot);
            servletContext.setAttribute("shots", shots);
        }
        req.setAttribute("shot", shot);
        servletContext.getRequestDispatcher("/response.jsp").forward(req, resp);
    }

    boolean checkFirstQuarter(double x, double y, double r) {
        return (x >= 0 && y >= 0) && (x * x + y * y <= r * r);
    }

    boolean checkSecondQuarter(double x, double y, double r) {
        return (x <= 0 && y >= 0) && (-2 * x + y <= r);
    }

    boolean checkThirdQuarter(double x, double y, double r) {
        return (x <= 0 && y <= 0) && (-2 * x <= r || -y <= r);
    }
}
