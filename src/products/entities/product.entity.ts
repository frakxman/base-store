import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()   
export class Product {
  @Prop({ type: String })
  _id?: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: Number, required: true })
  stock: number;
  @Prop({ type: [String], required: true })
  images: string[];
  @Prop({ type: Boolean, required: true })
  status: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
