package controller;

import com.google.gson.Gson;
import dto.Cart_DTO;
import dto.Response_DTO;
import dto.User_DTO;
import entity.Cart;
import entity.Product;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.HibernateUtil;
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "RemoveCartQty", urlPatterns = {"/RemoveCartQty"})
public class RemoveCartQty extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Response_DTO response_DTO = new Response_DTO();
        Gson gson = new Gson();

        HttpSession httpSession = req.getSession();

        String id = req.getParameter("id");
        String qty = req.getParameter("qty");

        if (!Validations.isInterger(id)) {
            response_DTO.setContent("Invalid Product ID");
        } else if (!Validations.isInterger(qty)) {
            response_DTO.setContent("Invalid Quantity");
        } else {

            int productId = Integer.parseInt(id);
            int quantity = Integer.parseInt(qty);

            Session session = HibernateUtil.getSessionFactory().openSession();
            Product product = (Product) session.get(Product.class, productId);

            if (req.getSession().getAttribute("user") != null) {
                User_DTO user_DTO = (User_DTO) req.getSession().getAttribute("user");

                Criteria criteria1 = session.createCriteria(User.class);
                criteria1.add(Restrictions.eq("email", user_DTO.getEmail()));
                User user = (User) criteria1.uniqueResult();

                Criteria criteria2 = session.createCriteria(Cart.class);
                criteria2.add(Restrictions.eq("user", user));
                criteria2.add(Restrictions.eq("product", product));

                if (!criteria2.list().isEmpty()) {
                    Cart cartItem = (Cart) criteria2.list().get(0);
                    System.out.println("id: " + cartItem.getId());

                    if (cartItem.getQty() - quantity < 1) {
                        response_DTO.setContent("Can't remove qty");
                    } else {
                        cartItem.setQty(cartItem.getQty() - quantity);
                        session.update(cartItem);
                        session.beginTransaction().commit();

                        response_DTO.setSuccess(true);
                        response_DTO.setContent("Quantity updated");
                    }

                }
            } else {// remove item fron session cart

                if (httpSession.getAttribute("sessionCart") != null) {
                    ArrayList<Cart_DTO> sessionCart = (ArrayList<Cart_DTO>) httpSession.getAttribute("sessionCart");
                    Cart_DTO foundCart_DTO = null;

                    for (Cart_DTO cart_DTO : sessionCart) {
                        if (cart_DTO.getProduct().getId() == product.getId()) {
                            foundCart_DTO = cart_DTO;
                            break;
                        }
                    }

                    if (foundCart_DTO != null) {

                        if (foundCart_DTO.getQty() + quantity < 1) {
                            response_DTO.setContent("Can't remove qty");
                        } else {
                            foundCart_DTO.setQty(foundCart_DTO.getQty() - quantity);
                            response_DTO.setSuccess(true);
                            response_DTO.setContent("Product updated successfully");
                        }

                    } else {
                        response_DTO.setContent("Item not found in session cart");
                    }

                } else {
                    response_DTO.setContent("Session cart is empty");

                }
            }

            session.close();

        }
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_DTO));

    }

}
