package controller;

import com.google.gson.Gson;
import dto.Response_DTO;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet(name = "SessionCheck", urlPatterns = {"/SessionCheck"})
public class SessionCheck extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Response_DTO response_dto = new Response_DTO();

        Gson gson = new Gson();

        if (req.getSession().getAttribute("user") != null) {
            response_dto.setSuccess(true);
        } else {
            response_dto.setContent("Not Signed In");
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_dto));
        System.out.println(gson.toJson(response_dto));

    }

}
