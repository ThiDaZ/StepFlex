package model;

import dto.SizeData_DTO;
import entity.Product;
import entity.Size;
import entity.Storage;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class SizeInsert {

    public SizeInsert(Product product, Size size, SizeData_DTO data) throws Exception {
        Session session = null;
        Transaction transaction = null;
        
        try {
            // Open session
            session = HibernateUtil.getSessionFactory().openSession();
            // Begin transaction
            transaction = session.beginTransaction();

            // Create Storage object and set its properties
            Storage storage = new Storage();
            storage.setProduct(product);
            storage.setQty(data.getQuantity());
            storage.setSize(size);
            
            // Save the Storage object

            // Commit the transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback(); // Rollback transaction if an exception occurs
            }
            System.out.println("Error during database operation: " + e.getMessage());
            e.printStackTrace(); // Print stack trace for better debugging
        } finally {
            if (session != null) {
                session.close(); // Ensure session is always closed
            }
        }
    }
}