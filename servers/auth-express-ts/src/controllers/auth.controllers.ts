import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import Usuario from "../models/Usuario.model";
import { generarJWT } from "../helpers/jwt.helper";

export const crearUsuario = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { email, password, name } = req.body;
	try {
		// verificar email unico
		const usuario = await Usuario.findOne({ email });
		if (usuario)
			return res.status(400).json({
				ok: false,
				msg: "El email ya existe en la Base de Datos",
			});

		//Crear usuario con el modelo
		const dbUsuario = new Usuario(req.body);

		// encriptar/hashear la contraseña
		const salt = bcrypt.genSaltSync();
		dbUsuario.password = bcrypt.hashSync(password, salt);

		// generar JWT
		const token = await generarJWT(dbUsuario.id, name);
		// console.log(token);

		// crear usuario de Base de Datos
		await dbUsuario.save();

		// Generar respuesta exitosa
		return res.status(201).json({
			ok: true,
			uid: dbUsuario.id,
			name: dbUsuario.name,
			token,
			email: dbUsuario.email,
			msg: "Se ha creado el usuario",
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ ok: false, msg: "Por favor hable con el administrador" });
	}
};

export const login = async (req: Request, res: Response): Promise<Response> => {
	const { email, password } = req.body;
	try {
		//Comprobar si el email existe en la base de datos
		const dbUser = await Usuario.findOne({ email });
		if (!dbUser)
			return res
				.status(400)
				.json({ ok: false, msg: "El email y/o password es incorrecto" });
		//comprobar si el password es el correcto
		const validPassword = bcrypt.compareSync(password, dbUser.password);
		if (!validPassword)
			return res
				.status(400)
				.json({ ok: false, msg: "El email y/o password es incorrecto" });

		// Generar el JWT
		const token = await generarJWT(dbUser.id, dbUser.name);

		// Devolvemos la respuesta correcta
		return res.status(200).json({
			ok: true,
			uid: dbUser.id,
			name: dbUser.name,
			email,
			token,
			msg: "Usuario logeado correctamente",
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ ok: false, msg: "Por favor hable con el administrador" });
	}
};

export const revalidarToken = async (req: Request, res: Response) => {
	const { uid } = req.user!;

	// Leer de la base de datos el email
	const dbUser = await Usuario.findById(uid);
	const { name, email } = dbUser!;

	// Generamos un nuevo token
	const token = await generarJWT(uid!, name);
	return res.json({
		ok: true,
		msg: "Revalidar token de Json Web Token - JWT",
		uid,
		name,
		email,
		token,
	});
};
