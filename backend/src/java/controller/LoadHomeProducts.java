package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import entity.Product;
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

@WebServlet(name = "LoadHomeProducts", urlPatterns = {"/LoadHomeProducts"})
public class LoadHomeProducts extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        JsonObject jsonObject = new JsonObject();
        Session session = HibernateUtil.getSessionFactory().openSession();
        
        Criteria criteria = session.createCriteria(Product.class);
        criteria.setMaxResults(12);
        List<Product> productList = criteria.list();
        
        jsonObject.add("productsList", gson.toJsonTree(productList));
        
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject));
        
    }
    
}
