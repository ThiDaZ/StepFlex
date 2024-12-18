package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import dto.Response_DTO;
import dto.UserUpdate_DTO;
import dto.User_DTO;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "UpdateUser", urlPatterns = {"/UpdateUser"})
public class UpdateUser extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Response_DTO response_DTO = new Response_DTO();
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        UserUpdate_DTO user_DTO = gson.fromJson(req.getReader(), UserUpdate_DTO.class);

        System.out.println(user_DTO.getFirst_name());

        System.out.println(user_DTO.getPassword());
        System.out.println(user_DTO.getNew_password());

        // check user still available
        if (req.getSession().getAttribute("user") != null) {
            User_DTO sessionUser_DTO = (User_DTO) req.getSession().getAttribute("user");
            String userEmail = user_DTO.getEmail();
            String sessionEmail = sessionUser_DTO.getEmail();

            System.out.println(sessionUser_DTO.getEmail() + " = " + user_DTO.getEmail());
            if (userEmail.equals(sessionEmail)) { //check session email 

                Session session = HibernateUtil.getSessionFactory().openSession();

                Criteria passwordCriteria = session.createCriteria(User.class);
                passwordCriteria.add(Restrictions.eq("email", user_DTO.getEmail()));
                if (!passwordCriteria.list().isEmpty()) { //check criteria
                    User user = (User) passwordCriteria.list().get(0);

                    //check if password need to change
                    if (user_DTO.getPassword().isEmpty()) {
                        System.out.println("password is empty");
                        //only change name
                        if (user_DTO.getFirst_name().isEmpty()) {
                            response_DTO.setContent("Please enter your First name");
                        } else if (user_DTO.getLast_name().isEmpty()) {
                            response_DTO.setContent("Please enter your last name");
                        } else {

                            user.setFirst_name(user_DTO.getFirst_name());
                            user.setLast_name(user_DTO.getLast_name());

                            session.update(user);
                            session.beginTransaction().commit();

                            sessionUser_DTO.setFirst_name(user_DTO.getFirst_name());
                            sessionUser_DTO.setLast_name(user_DTO.getLast_name());

                            req.getSession().setAttribute("user", sessionUser_DTO);

                            response_DTO.setSuccess(true);
                            response_DTO.setContent("User has Updated");
                            System.out.println("Name has changed");
                        }

                    } else {  //password need to change
                        System.out.println("password is not empty");

                        if (user_DTO.getFirst_name().isEmpty()) {
                            response_DTO.setContent("Please enter your First name");
                        } else if (user_DTO.getLast_name().isEmpty()) {
                            response_DTO.setContent("Please enter your last name");
                        } else if (user_DTO.getPassword().isEmpty()) {
                            response_DTO.setContent("Please enter your password");
                        } else if (user_DTO.getNew_password().isEmpty()) {
                            response_DTO.setContent("Please enter your new password");
                        } else if (!Validations.isPasswordValid(user_DTO.getNew_password())) {
                            response_DTO.setContent("Please must include at least "
                                    + "one uppercase letter, "
                                    + "number, "
                                    + "special character and "
                                    + "be least eight character long");
                        } else if (user_DTO.getConfirm_password().isEmpty()) {
                            response_DTO.setContent("Please add your confirm password");
                        } else if (!user_DTO.getNew_password().equals(user_DTO.getConfirm_password())) {
                            response_DTO.setContent("You new password not match to your confirm password");
                            System.out.println("password not matched");
                        } else if (!user.getPassword().equals(user_DTO.getPassword())) {
                            response_DTO.setContent("Current password not matching!!");
                        } else if (user_DTO.getNew_password().equals(user.getPassword())) {
                            response_DTO.setContent("You new password same as old password");
                            System.out.println("same password");

                        } else {

                            user.setFirst_name(user_DTO.getFirst_name());
                            user.setLast_name(user_DTO.getLast_name());
                            user.setPassword(user_DTO.getNew_password());

                            session.update(user);
                            session.beginTransaction().commit();

                            sessionUser_DTO.setFirst_name(user_DTO.getFirst_name());
                            sessionUser_DTO.setLast_name(user_DTO.getLast_name());

                            req.getSession().setAttribute("user", sessionUser_DTO);

                            response_DTO.setSuccess(true);
                            response_DTO.setContent("User password has Updated");
                            System.out.println("Name has password");

                        }
                    }

                }

            } else {
                response_DTO.setContent("user not matched!");

            }

        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_DTO));

    }

}
