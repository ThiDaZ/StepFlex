package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dto.User_DTO;
import entity.Address;
import entity.Cart;
import entity.District;
import entity.Order;
import entity.OrderItem;
import entity.OrderStatus;
import entity.Product;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.HibernateUtil;
import model.PayHere;
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "Checkout", urlPatterns = {"/Checkout"})
public class Checkout extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject reqJsonObject = gson.fromJson(req.getReader(), JsonObject.class);

        JsonObject responseJsonObject = new JsonObject();
        responseJsonObject.addProperty("success", false);

        HttpSession httpSession = req.getSession();

        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();

        boolean isCurrentAddress = reqJsonObject.get("default_address").getAsBoolean();
        String first_name = reqJsonObject.get("first_name").getAsString();
        String last_name = reqJsonObject.get("last_name").getAsString();
        String province = reqJsonObject.get("province").getAsString();
        String district = reqJsonObject.get("district").getAsString();
        String address1 = reqJsonObject.get("line1").getAsString();
        String address2 = reqJsonObject.get("line1").getAsString();
        String zip_code = reqJsonObject.get("zip_code").getAsString();
        String mobile = reqJsonObject.get("phone").getAsString();

        if (httpSession.getAttribute("user") != null) {

            User_DTO user_DTO = (User_DTO) httpSession.getAttribute("user");
            Criteria criteria1 = session.createCriteria(User.class);
            criteria1.add(Restrictions.eq("email", user_DTO.getEmail()));
            User user = (User) criteria1.uniqueResult();

            if (isCurrentAddress) {

                //get current address
                Criteria criteria2 = session.createCriteria(Address.class);
                criteria2.add(Restrictions.eq("user", user));
                criteria2.addOrder(org.hibernate.criterion.Order.desc("id"));
                criteria2.setMaxResults(1);

                if (criteria2.list().isEmpty()) {
                    //current address not found
                    responseJsonObject.addProperty("message", "Current address not found. Please create a new address");
                } else {
                    Address address = (Address) criteria2.list().get(0);
                    //complete checkout process
                    System.out.println("Get the current Address");
                    saveOrders(session, transaction, address, user, responseJsonObject);
                }

            } else {

                if (first_name.isEmpty()) {
                    responseJsonObject.addProperty("message", "Please add first name");
                } else if (last_name.isEmpty()) {
                    responseJsonObject.addProperty("message", "Please add last name");

                } else if (address1.isEmpty()) {
                    responseJsonObject.addProperty("message", "Please add Address line 1");
                } else if (address2.isEmpty()) {
                    responseJsonObject.addProperty("message", "Please add Address line 2");
                } else if (zip_code.isEmpty()) {
                    responseJsonObject.addProperty("message", "Please add Postal Code");
                } else if (mobile.isEmpty()) {
                    responseJsonObject.addProperty("message", "Please add mobile");
                } else if (!Validations.isMobileNumberValid(mobile)) {
                    responseJsonObject.addProperty("message", "Invalid mobile number");

                } else {

                    int districtId = Integer.parseInt(district);

                    Criteria districtCriteria = session.createCriteria(District.class);
                    districtCriteria.add(Restrictions.eq("id", districtId));
                    if (districtCriteria.list().isEmpty()) {
                        responseJsonObject.addProperty("message", "Invalid District");
                    } else {

                        District districtClass = (District) districtCriteria.list().get(0);

                        Address address = new Address();
                        address.setDistrict(districtClass);
                        address.setLine1(address1);
                        address.setLine2(address2);
                        address.setMobile(mobile);
                        address.setUser(user);
                        address.setZipCode(zip_code);

                        session.save(address);

                        System.out.println("new address created!");
                        saveOrders(session, transaction, address, user, responseJsonObject);

                    }

                }
            }

        } else {
            //not signed in
            responseJsonObject.addProperty("message", "User not signed in");

        }
        resp.setContentType("application/json");

        resp.getWriter().write(gson.toJson(responseJsonObject));

    }

    private void saveOrders(Session session, Transaction transaction, Address address, User user, JsonObject responseJsonObject) {

        try {
            System.out.println("save");
            Order order = new Order();
            order.setAddress(address);
            order.setDateTime(new Date());
            order.setUser(user);

            int order_id = (int) session.save(order);

            Criteria cartCriteria = session.createCriteria(Cart.class);
            cartCriteria.add(Restrictions.eq("user", user));
            List<Cart> cartList = cartCriteria.list();

            OrderStatus orderStatus = (OrderStatus) session.get(OrderStatus.class, 1);

            double amount = 0;
            String items = "";

            for (Cart cartItem : cartList) {
                amount += cartItem.getQty() * cartItem.getProduct().getPrice();
                items += cartItem.getProduct().getTitle() + 'x' + cartItem.getQty();

                Product product = cartItem.getProduct();

                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(order);
                orderItem.setOrderStatus(orderStatus);
                orderItem.setProduct(product);
                orderItem.setQty(cartItem.getQty());

                session.save(orderItem);

                product.setQty(product.getQty() - cartItem.getQty());
                session.update(product);

                session.delete(cartItem);
            }

            transaction.commit();
//set payment data
            String merchant_id = "1221161";
            String formatedAmount = new DecimalFormat("0.00").format(amount);
            String currency = "LKR";
            String addressLine = address.getLine1() + address.getLine2();
            String merchantSecret = PayHere.generateMD5("NjY5NDQ4MzQ1MTk0NjgxNzgzNTQwODY1ODI0MTM2NTY1NDQ2NjI=");

            JsonObject payhere = new JsonObject();
            payhere.addProperty("merchant_id", merchant_id);

            payhere.addProperty("return_url", "/");
            payhere.addProperty("cancel_url", "");
            payhere.addProperty("notify_url", "VerifyPayments");

            payhere.addProperty("first_name", user.getFirst_name());
            payhere.addProperty("last_name", user.getLast_name());
            payhere.addProperty("email", user.getEmail());
            payhere.addProperty("phone", address.getMobile());
            payhere.addProperty("address", addressLine);
            payhere.addProperty("city", address.getDistrict().getName());
            payhere.addProperty("country", "Sri-Lanka");
            payhere.addProperty("order_id", String.valueOf(order_id));
            payhere.addProperty("items", items);
            payhere.addProperty("currency", currency);
            payhere.addProperty("amount", formatedAmount);
            payhere.addProperty("sandbox", true);

            //generate md5
            String md5Hash = PayHere.generateMD5(merchant_id + order_id + formatedAmount + currency + merchantSecret);
            payhere.addProperty("hash", md5Hash);

            responseJsonObject.addProperty("success", true);
            responseJsonObject.addProperty("message", "Checkout Completed");

            Gson gson = new Gson();
            responseJsonObject.add("payhereJson", gson.toJsonTree(payhere));

        } catch (Exception e) {
            System.out.println(e);
        }

    }

}
