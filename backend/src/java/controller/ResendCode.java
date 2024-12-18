package controller;

import com.google.gson.Gson;
import dto.Response_DTO;
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
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "ResendCode", urlPatterns = {"/ResendCode"})
public class ResendCode extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Response_DTO response_DTO = new Response_DTO();
        Gson gson = new Gson();

        System.out.println("sessionId: " + req.getSession().getId());

        if (req.getSession().getAttribute("email") != null) {
            String email = req.getSession().getAttribute("email").toString();
            System.out.println(email);

            Session session = HibernateUtil.getSessionFactory().openSession();

            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("email", email));

            if (!criteria.list().isEmpty()) {

                User user = (User) criteria.list().get(0);

                System.out.println(user.getEmail());

                Criteria criteria2 = session.createCriteria(VerificationCode.class);
                criteria2.add(Restrictions.eq("user", user));

                if (!criteria2.list().isEmpty()) {
                    VerificationCode verificationCode = (VerificationCode) criteria2.list().get(0);

                    System.out.println(verificationCode.getCode());
                    response_DTO.setSuccess(true);

                    Thread sendMailThread = new Thread() {
                        @Override
                        public void run() {
                            Mail.sendMail(user.getEmail(), "Step Flex Verification",
                                    "Your verification code : " + verificationCode.getCode() + ""
                            );
                        }
                    };
                    sendMailThread.start();
                    response_DTO.setContent("Code has Sent to Mail");
                } else {
                    System.out.println("code not found!");
                    response_DTO.setSuccess(true);
                    response_DTO.setContent("code not found!");

                    int code = (int) (Math.random() * 1000000);

                    VerificationCode verificationCode = new VerificationCode();
                    verificationCode.setCode(String.valueOf(code));
                    verificationCode.setExpire_time("no_expire");
                    verificationCode.setPurpose("email_verification");
                    verificationCode.setUser(user);

                    user.getVerificationCode().add(verificationCode);
                    session.save(verificationCode);
                    session.beginTransaction().commit();

                }

            } else {
                System.out.println("User not Found!");
                response_DTO.setContent("Something went wrong, Try to sign in again!");
            }

        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_DTO));
        System.out.println(gson.toJson(response_DTO));

    }

}
