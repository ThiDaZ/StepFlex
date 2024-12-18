// Main interface for the complete structure
export interface UserCart {
    user: User;
    address: Address;
    cartList: CartItem[];
}

// User interface
interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

// Address interface
interface Address {
    id: number;
    line1: string;
    line2: string;
    zipCode: string;
    district: District;
    mobile: string;
}

// District interface
export interface District {
    id: number;
    name: string;
    province: Province;
}

// Province interface
export interface Province {
    id: number;
    name: string;
}

// Cart item interface
interface CartItem {
    product: Product;
    qty: number;
}

// Product interface
interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    brand: Brand;
    dateTime: string;
    qty: number;
    productStatus: ProductStatus;
    size: Size;
}

// Brand interface
interface Brand {
    Id: number;
    name: string;
}

// ProductStatus interface
interface ProductStatus {
    id: number;
    name: string;
}

// Size interface
interface Size {
    id: number;
    name: string;
    category: Category;
}

// Category interface
interface Category {
    id: number;
    name: string;
}