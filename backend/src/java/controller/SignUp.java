package controller;

import com.google.gson.Gson;
import dto.Response_DTO;
import dto.User_DTO;
import entity.User;
import entity.VerificationCode;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import model.Mail;
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "SignUp", urlPatterns = {"/SignUp"})
public class SignUp extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Response_DTO response_DTO = new Response_DTO();

        Gson gson = new Gson();
        User_DTO user_DTO = gson.fromJson(req.getReader(), User_DTO.class);

        //validation
        if (user_DTO.getFirst_name().isEmpty()) {
            response_DTO.setContent("Please enter your first name");
        } else if (user_DTO.getLast_name().isEmpty()) {
            response_DTO.setContent("Please enter your last name");
        } else if (user_DTO.getEmail().isEmpty()) {
            response_DTO.setContent("Please enter your email");
        } else if (!Validations.isEmailValid(user_DTO.getEmail())) {
            response_DTO.setContent("Please enter valid email");
        } else if (user_DTO.getPassword().isEmpty()) {
            response_DTO.setContent("Please enter your password");
        } else if (!Validations.isPasswordValid(user_DTO.getPassword())) {
            response_DTO.setContent("Please must include at least one uppercase letter, number, "
                    + "special character and be least eight character long");
        } else {
            Session session = HibernateUtil.getSessionFactory().openSession();

            //checking if user already available
            Criteria criteria1 = session.createCriteria(User.class);
            criteria1.add(Restrictions.eq("email", user_DTO.getEmail()));

            if (!criteria1.list().isEmpty()) {
                response_DTO.setContent("User with this Email already exists");
            } else {

//                System.out.println(user_DTO.getEmail());
//                System.out.println(user_DTO.getFirst_name());
//                System.out.println(user_DTO.getPassword());
//                System.out.println(user_DTO.getLast_name());
                User user = new User();
                user.setFirst_name(user_DTO.getFirst_name());
                user.setLast_name(user_DTO.getLast_name());
                user.setEmail(user_DTO.getEmail());
                user.setPassword(user_DTO.getPassword());
                user.setStatus("unverified");

                session.save(user);

                int code = (int) (Math.random() * 1000000);

                VerificationCode verificationCode = new VerificationCode();
                verificationCode.setCode(String.valueOf(code));
                verificationCode.setExpire_time("no_expire");
                verificationCode.setPurpose("email_verification");
                verificationCode.setUser(user);

//                System.out.println(verificationCode.getCode());
//                System.out.println(verificationCode.getExpire_time());
//                System.out.println(verificationCode.getPurpose());
//                System.out.println(verificationCode.getUser());
                user.getVerificationCode().add(verificationCode);
                session.save(verificationCode);
                session.beginTransaction().commit();
                req.getSession().setAttribute("email", user_DTO.getEmail());

                Thread sendMailThread = new Thread() {
                    @Override
                    public void run() {
                        Mail.sendMail(user.getEmail(), "Step Flex Verification",
                                "Your verification code : " + verificationCode.getCode() + " "
                        );
                    }
                };
                sendMailThread.start();

            }
            session.close();
        }
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_DTO));
    }
}
