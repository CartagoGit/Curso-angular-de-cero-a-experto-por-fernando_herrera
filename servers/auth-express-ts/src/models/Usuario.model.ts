import { model, Schema } from "mongoose";

export interface Usuario {
	uid?: string;
	name?: string;
	password?: string;
	email?: string;
	token?: string;
}

const usuarioSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

export default model("Usuario", usuarioSchema);
