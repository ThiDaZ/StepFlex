package dto;

import java.io.Serializable;

public class SizeData_DTO implements Serializable {

    private int id;
    private int size;
    private int quantity;

    public SizeData_DTO() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}
