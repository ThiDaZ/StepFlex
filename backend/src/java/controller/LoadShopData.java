package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.Brand;
import entity.Category;
import entity.Product;
import java.io.IOException;
import java.io.PrintWriter;
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

@WebServlet(name = "LoadShopData", urlPatterns = {"/LoadShopData"})
public class LoadShopData extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("success", false);

        Gson gson = new Gson();
        Session session = HibernateUtil.getSessionFactory().openSession();

        //load Category
        Criteria categoryCriteria = session.createCriteria(Category.class);
        categoryCriteria.addOrder(Order.asc("name"));
        List<Category> categoryList = categoryCriteria.list();
        jsonObject.add("categoryList", gson.toJsonTree(categoryList));

        //load brand
        Criteria brandCriteria = session.createCriteria(Brand.class);
        brandCriteria.addOrder(Order.asc("name"));
        List<Brand> brandList = brandCriteria.list();
        jsonObject.add("brandList", gson.toJsonTree(brandList));

        //load products
        Criteria productCriteria = session.createCriteria(Product.class);

        //get product count
        productCriteria.addOrder(Order.desc("id"));
        jsonObject.addProperty("allProductCount", productCriteria.list().size());

        //set product range
        productCriteria.setFirstResult(0);
//        productCriteria.setMaxResults(3);

        List<Product> productList = productCriteria.list();
        for (Product product : productList) {
            product.setUser(null);
        }

        jsonObject.add("productList", gson.toJsonTree(productList));
        jsonObject.addProperty("success", true);

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject));
    }

}
