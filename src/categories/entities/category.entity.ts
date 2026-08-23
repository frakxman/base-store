import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Category {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
