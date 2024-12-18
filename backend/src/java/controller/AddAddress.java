package controller;

import com.google.gson.Gson;
import dto.Address_DTO;
import dto.Response_DTO;
import dto.User_DTO;
import entity.Address;
import entity.District;
import entity.User;
import java.io.IOException;
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

@WebServlet(name = "AddAddress", urlPatterns = {"/AddAddress"})
public class AddAddress extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Response_DTO response_DTO = new Response_DTO();

        Gson gson = new Gson();
        Address_DTO address_DTO = gson.fromJson(req.getReader(), Address_DTO.class);

        if (address_DTO.getLine1().isEmpty()) {
            response_DTO.setContent("Please add address line 01");
        } else if (address_DTO.getDistrict() == 0) {
            response_DTO.setContent("Please add address District");
        } else if (address_DTO.getProvince() == 0) {
            response_DTO.setContent("Please add address Province");
        } else if (address_DTO.getZipCode().isEmpty()) {
            response_DTO.setContent("Please add Postal Code");
        } else if (address_DTO.getPhone().isEmpty()) {
            response_DTO.setContent("Please add mobile number");
        } else if (!Validations.isMobileNumberValid(address_DTO.getPhone())) {
            response_DTO.setContent("Please valid mobile number");
        } else {

            HttpSession httpSession = req.getSession();
            if (httpSession.getAttribute("user") != null) {

                Session session = HibernateUtil.getSessionFactory().openSession();
                User_DTO user_DTO = (User_DTO) httpSession.getAttribute("user");

                Criteria criteria1 = session.createCriteria(User.class);
                criteria1.add(Restrictions.eq("email", user_DTO.getEmail()));
                User user = (User) criteria1.uniqueResult();

                Criteria criteria2 = session.createCriteria(District.class);
                criteria2.add(Restrictions.eq("id", address_DTO.getDistrict()));
                District district = (District) criteria2.uniqueResult();

                Address address = new Address();
                address.setLine1(address_DTO.getLine1());

                if (address_DTO.getLine2().isEmpty()) {
                    address.setLine2("");
                } else {
                    address.setLine2(address_DTO.getLine2());
                }

                address.setUser(user);
                address.setDistrict(district);
                address.setMobile(address_DTO.getPhone());
                address.setZipCode(address_DTO.getZipCode());

                session.save(address);
                session.beginTransaction().commit();

                session.close();
                response_DTO.setSuccess(true);
                response_DTO.setContent("Address added successfully");

            } else {
                response_DTO.setContent("Session not vaild");
            }

        }
        
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_DTO));
    }

}
