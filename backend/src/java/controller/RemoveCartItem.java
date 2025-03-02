/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
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

@WebServlet(name = "RemoveCartItem", urlPatterns = {"/RemoveCartItem"})
public class RemoveCartItem extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        Response_DTO response_DTO = new Response_DTO();
        Gson gson = new Gson();
        
        String id = req.getParameter("id");
        
        if (!Validations.isInterger(id)) {
            response_DTO.setContent("Product not found");
        } else {
            int productId = Integer.parseInt(id);
            Session session = HibernateUtil.getSessionFactory().openSession();
            Product product = (Product) session.get(Product.class, productId);
            //select session cart or db cart
            if (req.getSession().getAttribute("user") != null) {
                User_DTO user_DTO = (User_DTO) req.getSession().getAttribute("user");

                //get db user
                Criteria criteria1 = session.createCriteria(User.class);
                criteria1.add(Restrictions.eq("email", user_DTO.getEmail()));
                User user = (User) criteria1.uniqueResult();

                //check in db cart
                Criteria criteria2 = session.createCriteria(Cart.class);
                criteria2.add(Restrictions.eq("user", user));
                criteria2.add(Restrictions.eq("product", product));
                
                if (!criteria2.list().isEmpty()) {
                    Cart cartItem = (Cart) criteria2.list().get(0);
                    System.out.println("id: " + cartItem.getId());
                    session.delete(cartItem);
                    session.beginTransaction().commit();
                    
                    response_DTO.setSuccess(true);
                    response_DTO.setContent("item removed from cart");
                }
            } else {// remove item fron session cart
                HttpSession httpSession = req.getSession();
                
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
                        sessionCart.remove(foundCart_DTO);
                        httpSession.setAttribute("sessionCart", sessionCart);
                        response_DTO.setSuccess(true);
                        response_DTO.setContent("Item removed from session cart");
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
