package controller;

import java.io.IOException;
import model.PayHere;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "VerifyPayments", urlPatterns = {"/VerifyPayments"})
public class VerifyPayments extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String merchant_id = req.getParameter("merchant_id");
        String order_id = req.getParameter("order_id");
        String payhere_amount = req.getParameter("payhere_amount");
        String payhere_currency = req.getParameter("payhere_currency");
        String status_code = req.getParameter("status_code");
        String md5sig = req.getParameter("md5sig");

        String merchant_secret = "NjY5NDQ4MzQ1MTk0NjgxNzgzNTQwODY1ODI0MTM2NTY1NDQ2NjI=";
        String merchant_secret_md5hash = PayHere.generateMD5(merchant_secret);

        String generateMD5Hash = PayHere.generateMD5(
                merchant_id
                + order_id
                + payhere_amount
                + payhere_currency
                + status_code
                + merchant_secret_md5hash
        );

        if (generateMD5Hash.equals(md5sig) && status_code.equals("2")) {

            //update order status paid
        }
    }

}
