package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.Cart_DTO;
import dto.Response_DTO;
import dto.User_DTO;
import entity.Cart;
import entity.User;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "SignIn", urlPatterns = {"/SignIn"})
public class SignIn extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Response_DTO response_DTO = new Response_DTO();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        User_DTO user_DTO = gson.fromJson(req.getReader(), User_DTO.class);

        String cookieHeader = "";

        if (user_DTO.getEmail().isEmpty()) {
            response_DTO.setContent("Please enter your Email.");
        } else if (user_DTO.getPassword().isEmpty()) {
            response_DTO.setContent("Please enter your Password.");
        } else {

            Session session = HibernateUtil.getSessionFactory().openSession();

            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("email", user_DTO.getEmail()));
            criteria.add(Restrictions.eq("password", user_DTO.getPassword()));

            if (!criteria.list().isEmpty()) {
                User user = (User) criteria.list().get(0);
                HttpSession httpSession = req.getSession();

                Cookie sessionCookie = new Cookie("JSESSIONID", httpSession.getId());
                sessionCookie.setSecure(false);
                sessionCookie.setHttpOnly(true);
                sessionCookie.setPath("/");
                sessionCookie.setMaxAge(7200);
                sessionCookie.setDomain("localhost");
//                resp.addCookie(sessionCookie);

                System.out.println(httpSession.getId());

                cookieHeader = "JSESSIONID=" + sessionCookie.getValue()
                        + "; Path=" + sessionCookie.getPath()
                        + "; HttpOnly"
                        + "; Max-Age=7200";

                if (user.getStatus().equals("suspended")) {
                    response_DTO.setContent("Your account has suspended. Please contact an admin.");
                } else if (user.getStatus().equals("unverified")) {
                    req.getSession().setAttribute("email", user_DTO.getEmail());
                    response_DTO.setContent("Unverified");
                } else if (user.getStatus().equals("verified")) {

                    user_DTO.setFirst_name(user.getFirst_name());
                    user_DTO.setLast_name(user.getLast_name());
                    user_DTO.setPassword(null);
                    req.getSession().setAttribute("user", user_DTO);

                    //Transfer session cart to db cart
                    if (req.getSession().getAttribute("sessionCart") != null) {

                        ArrayList<Cart_DTO> sessionCart = (ArrayList<Cart_DTO>) req.getSession().getAttribute("sessionCart");

                        Criteria criteria1 = session.createCriteria(Cart.class);
                        criteria1.add(Restrictions.eq("user", user));
                        List<Cart> dbCart = criteria1.list();

                        if (dbCart.isEmpty()) {
                            //db cart empty, add all session cart in to db cart
                            for (Cart_DTO cart_DTO : sessionCart) {
                                Cart cart = new Cart();
                                cart.setProduct(cart_DTO.getProduct());
                                cart.setQty(cart_DTO.getQty());
                                cart.setUser(user);
                                session.save(cart);
                            }
                        } else {
                            //found items in db cart
                            for (Cart_DTO cart_DTO : sessionCart) {
                                boolean isFoundInDBCart = false;

                                for (Cart cart : dbCart) {
                                    if (cart_DTO.getProduct().getId() == cart.getProduct().getId()) {

                                        //same product found in db and session cart
                                        isFoundInDBCart = true;
                                        if ((cart_DTO.getQty() + cart.getQty() <= cart.getProduct().getQty())) {
                                            //quantity available
                                            cart.setQty(cart_DTO.getQty() + cart.getQty());
                                            session.update(cart);
                                        } else {
                                            //quantity not availble, set max available qty
                                            cart.setQty(cart.getProduct().getQty());
                                            session.update(cart);
                                        }
                                    }
                                }
                                if (!isFoundInDBCart) {
                                    //not found in db cart
                                    Cart cart = new Cart();
                                    cart.setProduct(cart_DTO.getProduct());
                                    cart.setQty(cart_DTO.getQty());
                                    cart.setUser(user);
                                    session.save(cart);
                                }
                            }

                        }

                    }
                    session.beginTransaction().commit();
                    response_DTO.setSuccess(true);
                    response_DTO.setContent("Sign In Success");

                } else {
                    response_DTO.setContent("Somthing went wrong!");
                }

            } else {
                response_DTO.setContent("Invalid details! Please try again.");
            }

            session.close();
        }

        resp.setHeader("Set-Cookie", cookieHeader);
        resp.setContentType("application/json");

        resp.getWriter().write(gson.toJson(response_DTO));
        System.out.println(gson.toJson(response_DTO));
    }

}
