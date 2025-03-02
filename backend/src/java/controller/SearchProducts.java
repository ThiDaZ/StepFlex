package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.Brand;
import entity.Category;
import entity.Product;
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

@WebServlet(name = "SearchProducts", urlPatterns = {"/SearchProducts"})
public class SearchProducts extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Gson gson = new Gson();

        JsonObject responseJsonObject = new JsonObject();
        responseJsonObject.addProperty("success", false);
        JsonObject reqJsonObject = gson.fromJson(req.getReader(), JsonObject.class);

        Session session = HibernateUtil.getSessionFactory().openSession();

        Criteria productCriteria = session.createCriteria(Product.class);

        if (reqJsonObject.has("category")) {
            String categoryName = reqJsonObject.get("category").getAsString();

            Criteria categoryCriteria = session.createCriteria(Category.class);
            categoryCriteria.add(Restrictions.eq("name", categoryName));
            List<Category> categoryList = categoryCriteria.list();

            Category category = (Category) categoryCriteria.uniqueResult();

            Criteria sizeCriteria = session.createCriteria(Size.class);
            sizeCriteria.add(Restrictions.in("category", categoryList));
            List<Size> sizeList = sizeCriteria.list();
//            Size sizeList = (Size) sizeCriteria.list();

            productCriteria.add(Restrictions.in("size", sizeList));
        }

        if (reqJsonObject.has("brand")) {
            String brandName = reqJsonObject.get("brand").getAsString();

            Criteria brandCriteria = session.createCriteria(Brand.class);
            brandCriteria.add(Restrictions.eq("name", brandName));
            Brand brand = (Brand) brandCriteria.uniqueResult();

            productCriteria.add(Restrictions.eq("brand", brand));
        }

        Double price_range_start = reqJsonObject.get("min_price").getAsDouble();
        Double price_range_end = reqJsonObject.get("max_price").getAsDouble();

        productCriteria.add(Restrictions.ge("price", price_range_start));
        productCriteria.add(Restrictions.le("price", price_range_end));

        //filter products by sorting from db
        String sort_text = reqJsonObject.get("sort_text").getAsString();

        if (sort_text.equals("Sort by Latest")) {

            productCriteria.addOrder(Order.desc("id"));

        } else if (sort_text.equals("Sort by Oldest")) {

            productCriteria.addOrder(Order.asc("id"));

        } else if (sort_text.equals("Sort by Name")) {

            productCriteria.addOrder(Order.asc("title"));

        } else if (sort_text.equals("Sort by Price")) {

            productCriteria.addOrder(Order.asc("price"));

        }

        //get all product count
        responseJsonObject.addProperty("allProductCount", productCriteria.list().size());

        //get product list
        List<Product> productList = productCriteria.list();
        for (Product product : productList) {
            product.setUser(null);
        }

        responseJsonObject.add("productList", gson.toJsonTree(productList));
        responseJsonObject.addProperty("success", true);

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responseJsonObject));

    }

}
