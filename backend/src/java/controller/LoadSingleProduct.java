package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dto.Response_DTO;
import entity.Product;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.Response;
import model.HibernateUtil;
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;

@WebServlet(name = "LoadSingleProduct", urlPatterns = {"/LoadSingleProduct"})
public class LoadSingleProduct extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        Session session = HibernateUtil.getSessionFactory().openSession();
        JsonObject jsonObject = new JsonObject();

        try {

            String productId = req.getParameter("id");

            if (Validations.isInterger(productId)) {

                Product product = (Product) session.get(Product.class, Integer.parseInt(productId));
                product.getUser().setPassword(null);
                product.getUser().setStatus(null);
                product.getUser().setVerificationCode(null);
                product.getUser().setEmail(null);

                jsonObject.add("product", gson.toJsonTree(product));

            }
        } catch (Exception e) {
            System.out.println(e);
        }

        session.close();
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject));
    }

}
