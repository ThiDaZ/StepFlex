export interface CartItems {
    product:Product;
    qty:number;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    dataTime: string;
    qty: number;
    size: Size;
    brand: Brand;
}

export interface Brand {
    id: number;
    name: string;
}

export interface Size {
    id: number;
    name: string;
    category: Category;
}

export interface Category {
    id: number;
    name: string;
}