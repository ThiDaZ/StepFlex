package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import dto.User_DTO;
import entity.Address;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "LoadAddress", urlPatterns = {"/LoadAddress"})
public class LoadAddress extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        JsonObject jsonObject = new JsonObject();

        HttpSession httpSession = req.getSession();
        if (httpSession.getAttribute("user") != null) {

            User_DTO user_DTO = (User_DTO) httpSession.getAttribute("user");

            Session session = HibernateUtil.getSessionFactory().openSession();
            Criteria userCriteria = session.createCriteria(User.class);
            userCriteria.add(Restrictions.eq("email", user_DTO.getEmail()));
            User user = (User) userCriteria.uniqueResult();

            Criteria addressCriteria = session.createCriteria(Address.class);
            addressCriteria.add(Restrictions.eq("user", user));
            List<Address> addressList = addressCriteria.list();

            jsonObject.add("addressList", gson.toJsonTree(addressList));

            session.close();

        } else {
            System.out.println("Invalid session");
        }
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject));
    }

}
