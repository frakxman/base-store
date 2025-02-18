import { Product } from "src/products/entities/product.entity";

export class Invoice {
    id: string;
    user_id: string;
    products: Product[];
    total: number;
    date: Date;
}
