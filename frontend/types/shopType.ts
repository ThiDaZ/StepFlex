export interface Category {
    id: number;
    name: string;
}

export interface Brand {
    Id: number;
    name: string;
}


export interface ProductStatus {
    id: number;
    name: string;
}

export interface Size {
    id: number;
    name: string;
    category: Category;
}


export interface ProductBrand {
    Id: number;
    name: string;
}


export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    brand: ProductBrand;
    dateTime: string;
    qty: number;
    productStatus: ProductStatus;
    size: Size;
}

export interface ShopDataProps {
    success: boolean;
    categoryList: Category[];
    brandList: Brand[];
    allProductCount: number;
    productList: Product[];
}