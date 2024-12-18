export interface brandProps {
    Id: number;
    name: string;
}

export interface sizeProps {
    id: number
    size: string;
    name: string;
    quantity: number;
}

export interface categoryProps {
    id: number;
    name: string;
    category: categoryProps;
}