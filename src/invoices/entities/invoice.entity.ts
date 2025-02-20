import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

/**
 * Represents an invoice in the system.
 */
@Schema()
export class Invoice extends Document {
  /**
   * The ID of the user associated with the invoice.
   */
  @Prop({ type: String, required: true })
  user_id: string;

  /**
   * The list of products included in the invoice.
   * Each product contains only the name, price, and quantity.
   */
  @Prop({
    type: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    required: true,
  })
  products: { name: string; price: number; quantity: number }[];

  /**
   * The total amount for the invoice.
   */
  @Prop({ type: Number, required: true })
  total: number;

  /**
   * The date when the invoice was created.
   */
  @Prop({ type: Date, default: Date.now })
  date: Date;
}

/**
 * The schema for the Invoice entity.
 */
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
