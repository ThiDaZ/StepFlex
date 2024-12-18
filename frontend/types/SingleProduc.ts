
export interface SingleProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    qty: number;
    dateTime: string;
    brand: brandProps;
    size: sizeProps;
    user: userProps;
}

export interface brandProps {
    Id: number;
    name: string;
}

export interface sizeProps {
    id: number
    name: string;
    category: categoryProps;
}

export interface categoryProps {
    id: number;
    name: string;
}

export interface userProps {
    id: number;
    first_name: string;
    last_name: string;
}