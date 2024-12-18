package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import dto.Response_DTO;
import dto.User_DTO;
import entity.Product;
import entity.User;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "LoadUserProducts", urlPatterns = {"/LoadUserProducts"})
public class LoadUserProducts extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Response_DTO response_DTO = new Response_DTO();
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

        JsonObject jsonObject = new JsonObject();

        if (req.getSession().getAttribute("user") != null) {

            User_DTO user_DTO = (User_DTO) req.getSession().getAttribute("user");

            Session session = HibernateUtil.getSessionFactory().openSession();

            Criteria criteria1 = session.createCriteria(User.class);
            criteria1.add(Restrictions.eq("email", user_DTO.getEmail()));

            if (!criteria1.list().isEmpty()) {
                User user = (User) criteria1.list().get(0);
                System.out.println("pass1");

                Criteria criteria2 = session.createCriteria(Product.class);
                criteria2.add(Restrictions.eq("user", user));
                criteria2.addOrder(Order.asc("dateTime"));
                List<Product> productList = criteria2.list();

                System.out.println(productList);

                if (!productList.isEmpty()) {
                    jsonObject.add("userProductsList", gson.toJsonTree(productList));

                    response_DTO.setSuccess(true);
                }

            }
            session.close();
        }
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject));

    }

}
