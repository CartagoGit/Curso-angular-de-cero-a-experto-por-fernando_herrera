import { Usuario } from "../../src/models/Usuario.model";

declare global {
	namespace Express {
		interface Request {
			user?: Usuario;
		}
	}
}

export {};
