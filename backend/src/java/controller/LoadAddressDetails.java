package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.District;
import entity.Province;
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

@WebServlet(name = "LoadAddressDetails", urlPatterns = {"/LoadAddressDetails"})
public class LoadAddressDetails extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        Session session = HibernateUtil.getSessionFactory().openSession();

        Criteria districtCriteria = session.createCriteria(District.class);
        districtCriteria.addOrder(Order.asc("name"));
        List<District> districtList = districtCriteria.list();

        Criteria provinceCriteria = session.createCriteria(Province.class);
        provinceCriteria.addOrder(Order.asc("name"));
        List<Province> provinceList = provinceCriteria.list();

        JsonObject jsonObject = new JsonObject();
        jsonObject.add("districtList", gson.toJsonTree(districtList));
        jsonObject.add("provinceList", gson.toJsonTree(provinceList));

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject));

        session.close();

    }

}
