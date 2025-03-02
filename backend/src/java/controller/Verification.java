package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
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
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "Verification", urlPatterns = {"/Verification"})
public class Verification extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Response_DTO responose_dto = new Response_DTO();

        Gson gson = new Gson();
        JsonObject dto = gson.fromJson(req.getReader(), JsonObject.class);
        String verification = dto.get("verification").getAsString();

        if (req.getSession().getAttribute("email") != null) {
            String email = req.getSession().getAttribute("email").toString();

            System.out.println(email);
            System.out.println(verification);

            Session session = HibernateUtil.getSessionFactory().openSession();

            Criteria criteria1 = session.createCriteria(User.class);
            criteria1.add(Restrictions.eq("email", email));

            if (!criteria1.list().isEmpty()) {

                User user = (User) criteria1.list().get(0);

                Criteria criteria2 = session.createCriteria(VerificationCode.class);
                criteria2.add(Restrictions.eq("user", user));
                criteria2.add(Restrictions.eq("code", verification));

                if (!criteria2.list().isEmpty()) {

                    VerificationCode verificationCode = (VerificationCode) criteria2.list().get(0);
                    verificationCode.setCode("done");
                    verificationCode.getUser().setStatus("verified");

                    session.update(verificationCode);
                    session.beginTransaction().commit();

                    User_DTO user_DTO = new User_DTO();
                    user_DTO.setFirst_name(verificationCode.getUser().getFirst_name());
                    user_DTO.setLast_name(verificationCode.getUser().getLast_name());
                    user_DTO.setEmail(verificationCode.getUser().getEmail());

                    req.getSession().removeAttribute("email");
                    req.getSession().setAttribute("user", user_DTO);

                    responose_dto.setSuccess(true);
                    responose_dto.setContent("Verification success");

                } else {
                    responose_dto.setContent("Invalid verification code");
                }

            } else {
                responose_dto.setContent("Verfication unvailable Please Sign in");
            }

        } else {
            responose_dto.setContent("Verfication unvailable Please Sign in");
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responose_dto));
        System.out.println(gson.toJson(responose_dto));

    }

}
