import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Product, ProductSchema } from "src/products/entities/product.entity";

@Schema()
export class Invoice {
    @Prop({ type: String })
    id: string;
    @Prop({ type: String })
    user_id: string;
    @Prop({ type: [ProductSchema] })
    products: Product[];
    @Prop({ type: Number })
    total: number;
    @Prop({ type: Date })
    date: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
