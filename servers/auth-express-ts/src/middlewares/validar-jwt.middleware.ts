import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

interface Payload {
	uid: string;
	name: string;
	email: string;
	iat: number;
	exp: number;
}

export const validarJWT = (req: any, res: Response, next: NextFunction) => {
	const token = req.header("x-token");

	if (!token) {
		return res
			.status(401)
			.json({ ok: false, msg: "Error en el token de acceso" });
	}

	try {
		const { uid, name, email } = jwt.verify(
			token,
			process.env.SECRET_JWT_SEED as Secret
		) as Payload;
		//Parcheado en la carpeta @type para que typescript reconozca la interfaz de usuario en la request
		req.user = { uid, name, email };
		// console.log(uid, name, payload);
	} catch (error) {
		return res.status(401).json({ ok: false, msg: "Token no válido" });
	}

	// OK!
	return next();
};
