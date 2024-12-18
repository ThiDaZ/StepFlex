package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.Brand;
import entity.Category;
import entity.Size;
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

@WebServlet(name = "LoadDetails", urlPatterns = {"/LoadDetails"})
public class LoadDetails extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        Session session = HibernateUtil.getSessionFactory().openSession();

        Criteria categoryCriteria = session.createCriteria(Category.class);
        categoryCriteria.addOrder(Order.asc("name"));
        List<Category> categoryList = categoryCriteria.list();

        Criteria brandCriteria = session.createCriteria(Brand.class);
        brandCriteria.addOrder(Order.asc("name"));
        List<Brand> brandList = brandCriteria.list();

        Category menSize = (Category) categoryCriteria.list().get(1);//kids 0
        Category womenSize = (Category) categoryCriteria.list().get(2);//men 1
        Category kidSize = (Category) categoryCriteria.list().get(0);//women 2

        Criteria menSizeCriteria = session.createCriteria(Size.class);
        menSizeCriteria.add(Restrictions.eq("category", menSize));
        menSizeCriteria.addOrder(Order.asc("name"));
        List<Size> menSizeList = menSizeCriteria.list();

        Criteria womenSizeCriteria = session.createCriteria(Size.class);
        womenSizeCriteria.add(Restrictions.eq("category", womenSize));
        womenSizeCriteria.addOrder(Order.asc("name"));
        List<Size> womenSizeList = womenSizeCriteria.list();

        Criteria kidsSizeCriteria = session.createCriteria(Size.class);
        kidsSizeCriteria.add(Restrictions.eq("category", kidSize));
        kidsSizeCriteria.addOrder(Order.asc("name"));
        List<Size> kidsSizeList = kidsSizeCriteria.list();

        JsonObject jsonObject = new JsonObject();
        jsonObject.add("categoryList", gson.toJsonTree(categoryList));
        jsonObject.add("brandList", gson.toJsonTree(brandList));
        jsonObject.add("menSizeList", gson.toJsonTree(menSizeList));
        jsonObject.add("womenSizeList", gson.toJsonTree(womenSizeList));
        jsonObject.add("kidsSizeList", gson.toJsonTree(kidsSizeList));

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject));

        session.close();
    }

}
