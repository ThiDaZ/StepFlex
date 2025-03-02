package controller;

import com.google.gson.Gson;
import com.sun.tools.javac.comp.TransTypes;
import dto.Cart_DTO;
import dto.Response_DTO;
import dto.User_DTO;
import entity.Cart;
import entity.Product;
import entity.User;
import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.HibernateUtil;
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "AddToCart", urlPatterns = {"/AddToCart"})
public class AddToCart extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Response_DTO response_DTO = new Response_DTO();

        String id = req.getParameter("id");
        String qty = req.getParameter("qty");

        Gson gson = new Gson();

        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();

        try {
            if (!Validations.isInterger(id)) {
                response_DTO.setContent("Product not found");
            } else if (!Validations.isInterger(qty)) {
                response_DTO.setContent("Invalid quantity");
            } else {

                int productId = Integer.parseInt(id);
                int quantity = Integer.parseInt(qty);

                if (quantity <= 0) {
                    response_DTO.setContent("Quantity must be greater than 0");
                } else {
                    Product product = (Product) session.get(Product.class, productId);

                    if (product != null) {//product found
                        //checing user loging status  
                        if (req.getSession().getAttribute("user") != null) {// user found
                            User_DTO user_DTO = (User_DTO) req.getSession().getAttribute("user");

                            Criteria criteria1 = session.createCriteria(User.class);
                            criteria1.add(Restrictions.eq("email", user_DTO.getEmail()));
                            User user = (User) criteria1.uniqueResult();

                            Criteria criteria2 = session.createCriteria(Cart.class);
                            criteria2.add(Restrictions.eq("user", user));
                            criteria2.add(Restrictions.eq("product", product));

                            //check in db cart has the product
                            if (criteria2.list().isEmpty()) {//cart has no product

                                if (quantity <= product.getQty()) {// check qty if exceed
                                    Cart cart = new Cart();
                                    cart.setProduct(product);
                                    cart.setQty(quantity);
                                    cart.setUser(user);

                                    session.save(cart);
                                    session.getTransaction().commit();

                                    response_DTO.setContent(true);
                                    response_DTO.setContent("Product added to the Cart");
                                } else {
                                    //qty exceed
                                    response_DTO.setContent("Quantity limit exceed");
                                }

                            } else { //cart has the product
                                Cart cartItem = (Cart) criteria2.uniqueResult();

                                if (cartItem.getQty() + quantity <= product.getQty()) {//add one qty to product
                                    cartItem.setQty(quantity);

                                    session.update(cartItem);
                                    transaction.commit();

                                    response_DTO.setSuccess(true);
                                    response_DTO.setContent("Product update successfully");
                                } else {
                                    response_DTO.setContent("Quantity limit exceed, not available");

                                }

                            }

                        } else { //session cart
                            HttpSession httpSession = req.getSession();

                            if (httpSession.getAttribute("sessionCart") != null) { //session cart found
                                ArrayList<Cart_DTO> sessionCart = (ArrayList<Cart_DTO>) httpSession.getAttribute("sessionCart");
                                Cart_DTO foundCart_DTO = null;

                                for (Cart_DTO cart_DTO : sessionCart) {// checking cart has the product
                                    if (cart_DTO.getProduct().getId() == product.getId()) {
                                        foundCart_DTO = cart_DTO;
                                        break;
                                    }
                                }

                                if (foundCart_DTO != null) {// has product
                                    if (foundCart_DTO.getQty() + quantity <= product.getQty()) {
                                        //update qty
                                        foundCart_DTO.setQty(foundCart_DTO.getQty() + quantity);

                                        response_DTO.setSuccess(true);
                                        response_DTO.setContent("Product updated successfully");
                                    } else {
                                        response_DTO.setContent("Quantity not available, limit excced");

                                    }
                                } else {// product not found

                                    if (quantity <= product.getQty()) {

                                        //add to session cart
                                        Cart_DTO cart_DTO = new Cart_DTO();
                                        cart_DTO.setProduct(product);
                                        cart_DTO.setQty(quantity);
                                        sessionCart.add(cart_DTO);

                                        response_DTO.setSuccess(true);
                                        response_DTO.setContent("Product added to the Cart");

                                    } else {
                                        //quantity not available
                                        response_DTO.setContent("Quantity not available");
                                    }

                                }
                            } else { //session cart not found
                                if (quantity <= product.getQty()) {
                                    //add to session cart
                                    ArrayList<Cart_DTO> sessionCart = new ArrayList<>();

                                    Cart_DTO cart_DTO = new Cart_DTO();
                                    cart_DTO.setProduct(product);
                                    cart_DTO.setQty(quantity);
                                    sessionCart.add(cart_DTO);

                                    httpSession.setAttribute("sessionCart", sessionCart);

                                    Cookie sessionCookie = new Cookie("JSESSIONID", httpSession.getId());
                                    sessionCookie.setSecure(false);
                                    sessionCookie.setHttpOnly(true);
                                    sessionCookie.setPath("/");
                                    sessionCookie.setMaxAge(7200);
                                    sessionCookie.setDomain("localhost");

                                    System.out.println(httpSession.getId());

                                    String cookieHeader = "JSESSIONID=" + sessionCookie.getValue()
                                            + "; Path=" + sessionCookie.getPath()
                                            + "; HttpOnly"
                                            + "; Max-Age=7200";

                                    resp.setHeader("Set-Cookie", cookieHeader);
                                    response_DTO.setSuccess(true);
                                    response_DTO.setContent("Product added to the Cart");

                                } else {
                                    //quantity not available
                                    response_DTO.setContent("Quantity not available");
                                }

                            }
                        }

                    } else {

                        //product not found
                        response_DTO.setContent("Product not found");
                    }
                }

            }

        } catch (Exception e) {
            System.out.println(e);
            response_DTO.setContent("Unable to process your request");

        }
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_DTO));
        session.close();
    }

}
