package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dto.Cart_DTO;
import dto.User_DTO;
import entity.Address;
import entity.Cart;
import entity.Product;
import entity.User;
import java.io.IOException;
import java.util.ArrayList;
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

@WebServlet(name = "LoadCheckOut", urlPatterns = {"/LoadCheckOut"})
public class LoadCheckOut extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject jsonObject = new JsonObject();

        try {
            HttpSession httpSession = req.getSession();
            if (httpSession.getAttribute("user") != null) {

                User_DTO user_DTO = (User_DTO) httpSession.getAttribute("user");

                Session session = HibernateUtil.getSessionFactory().openSession();
                Criteria userCriteria = session.createCriteria(User.class);
                userCriteria.add(Restrictions.eq("email", user_DTO.getEmail()));
                User user = (User) userCriteria.uniqueResult();
                user.setVerificationCode(null);
                user.setPassword(null);
                user.setStatus(null);

                Criteria addressCriteria = session.createCriteria(Address.class);
                addressCriteria.add(Restrictions.eq("user", user));
                Address addresss = (Address) addressCriteria.list().get(0);
                addresss.setUser(null);

                ArrayList<Cart_DTO> cart_DTO_List = new ArrayList<>();
                Criteria criteria2 = session.createCriteria(Cart.class);
                criteria2.add(Restrictions.eq("user", user));
                List<Cart> cartList = criteria2.list();

                for (Cart cart : cartList) {
                    Cart_DTO cart_DTO = new Cart_DTO();

                    Product product = cart.getProduct();
                    product.setUser(null);

                    cart_DTO.setProduct(product);
                    cart_DTO.setQty(cart.getQty());
                    cart_DTO_List.add(cart_DTO);
                }

                jsonObject.add("user", gson.toJsonTree(user));
                jsonObject.add("address", gson.toJsonTree(addresss));
                jsonObject.add("cartList", gson.toJsonTree(cart_DTO_List));

                session.close();

            } else {
                System.out.println("Invalid session");
            }

        } catch (Exception e) {
            System.out.println(e);
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject));
    }

}
