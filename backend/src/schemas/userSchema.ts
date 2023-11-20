import { Schema, InferSchemaType, model } from "mongoose";

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
},{timestamps: true})

type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);