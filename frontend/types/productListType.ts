export interface productProps {
    id: number;
    title: string;
    description: string;
    price: number;
    qty: number;
    dateTime: string;
    brand: BrandsProps;
    size: SizesProps;
}

export interface SizesProps {
    name: string;
    category: CategoriesProps;
}

export interface BrandsProps {
    name: string;
}

export interface CategoriesProps {
    name: string;
}