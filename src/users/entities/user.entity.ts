import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({ type: String })
    name: string;
    @Prop({ type: String })
    email: string;
    @Prop({ type: String })
    password: string;
    @Prop({ type: String })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
