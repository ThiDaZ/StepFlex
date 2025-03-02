package controller;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dto.Response_DTO;
import dto.SizeData_DTO;
import dto.User_DTO;
import entity.Brand;
import entity.Category;
import entity.Product;
import entity.ProductStatus;
import entity.Size;
import entity.Storage;
import entity.User;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import model.HibernateUtil;
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import model.SizeInsert;

@MultipartConfig
@WebServlet(name = "ProductListing", urlPatterns = {"/ProductListing"})
public class ProductListing extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Response_DTO response_DTO = new Response_DTO();
        Gson gson = new Gson();

//        Type listType = new TypeToken<List<SizeData_DTO>>() {
//        }.getType();
//        List<SizeData_DTO> sizeDataList = gson.fromJson(req.getParameter("sizeData"), listType);
        String brandId = req.getParameter("brand");
        String categoryId = req.getParameter("category");
        String title = req.getParameter("title");
        String description = req.getParameter("description");
        String price = req.getParameter("price");
        String sizeId = req.getParameter("size");
        String quantity = req.getParameter("quantity");

        Part image1 = req.getPart("images0");
        Part image2 = req.getPart("images1");
        Part image3 = req.getPart("images2");
        Part image4 = req.getPart("images2");
//
//        System.out.println(title);
//        System.out.println(description);
//        System.out.println(price);
//        System.out.println(brandId);
        System.out.println(quantity);
        System.out.println(sizeId);

//        System.out.println("image 01:" + image1.getName());
//        System.out.println("image 02:" + image2);
        Session session = HibernateUtil.getSessionFactory().openSession();

        if (!Validations.isInterger(categoryId)) {
            response_DTO.setContent("Invalid category");
        } else if (!Validations.isInterger(brandId)) {
            response_DTO.setContent("Invalid brand");
        } else if (title.isEmpty()) {
            response_DTO.setContent("Please add title");
        } else if (description.isEmpty()) {
            response_DTO.setContent("Please add description");
        } else if (!Validations.isDouble(price)) {
            response_DTO.setContent("Invalid price");
        } else if (image1.getSubmittedFileName() == null) {
            response_DTO.setContent("Please upload least one image");
        } else if (sizeId.isEmpty()) {
            response_DTO.setContent("Please add size");
        } else if (quantity.isEmpty()) {
            response_DTO.setContent("Please add quantity");
        } else {

            Brand brand = (Brand) session.get(Brand.class, Integer.parseInt(brandId));
            if (brand == null) {
                response_DTO.setContent("Please select valid brand");
            } else {
                Category category = (Category) session.get(Category.class, Integer.parseInt(categoryId));
                if (category == null) {
                    response_DTO.setContent("Please select valid category");
                } else {
                    Size size = (Size) session.get(Size.class, Integer.parseInt(sizeId));
                    System.out.println(size.getId());
                    if (size == null) {
                        response_DTO.setContent("Please select valid size");
                    } else {
                        try {
                            Product product = new Product();
                            product.setTitle(title);
                            product.setDescription(description);
                            product.setPrice(Double.parseDouble(price));
                            product.setBrand(brand);
                            product.setSize(size);
                            product.setQty(Integer.parseInt(quantity));
                            product.setDateTime(new Date());

                            System.out.println(title);
                            System.out.println(description);
                            System.out.println(Double.parseDouble(price));
                            System.out.println(brand);
                            System.out.println(category);
                            System.out.println(new Date());

                            //get product status
                            ProductStatus productStatus = (ProductStatus) session.load(ProductStatus.class, 1);
                            product.setProductStatus(productStatus);
                            System.out.println(productStatus);

                            //get user
                            User_DTO user_DTO = (User_DTO) req.getSession().getAttribute("user");
                            Criteria criteria = session.createCriteria(User.class);
                            criteria.add(Restrictions.eq("email", user_DTO.getEmail()));
                            User user = (User) criteria.uniqueResult();

                            product.setUser(user);

                            int pid = (int) session.save(product);

                            session.beginTransaction().commit();

                            String applicationPath = req.getServletContext().getRealPath("");
                            String newApplicationPath = applicationPath.replace("build/web", "web");

                            File folder = new File(newApplicationPath + "//products-images//" + pid);
                            folder.mkdir();

                            if (image1.getInputStream() != null) {
                                File file1 = new File(folder, "image1.png");
                                InputStream inputStream1 = image1.getInputStream();
                                Files.copy(inputStream1, file1.toPath(), StandardCopyOption.REPLACE_EXISTING);
                            }

                            if (image2.getInputStream() != null) {
                                File file2 = new File(folder, "image2.png");
                                InputStream inputStream2 = image2.getInputStream();
                                Files.copy(inputStream2, file2.toPath(), StandardCopyOption.REPLACE_EXISTING);
                            }

                            if (image3.getInputStream() != null) {
                                File file3 = new File(folder, "image3.png");
                                InputStream inputStream3 = image3.getInputStream();
                                Files.copy(inputStream3, file3.toPath(), StandardCopyOption.REPLACE_EXISTING);
                            }

                            if (image4.getInputStream() != null) {
                                File file4 = new File(folder, "image4.png");
                                InputStream inputStream4 = image4.getInputStream();
                                Files.copy(inputStream4, file4.toPath(), StandardCopyOption.REPLACE_EXISTING);
                            }

                            response_DTO.setSuccess(true);
                            response_DTO.setContent("New Product Added");

                        } catch (Exception e) {
                            System.out.println(e);
                        }

                    }

                }
            }
            session.close();
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response_DTO));

    }

}
