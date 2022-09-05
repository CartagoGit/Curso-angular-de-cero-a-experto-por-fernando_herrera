import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.middleware";
import { validarJWT } from "../middlewares/validar-jwt.middleware";
import {
	crearUsuario,
	login,
	revalidarToken,
} from "../controllers/auth.controllers";

export const router = Router();

// Crear nuevo usuario
router.post(
	"/new",
	[
		check("email", "El email es obligatorio").isEmail(),
		check("password", "La constraseña es obligatoria").isLength({ min: 6 }),
		check("name", "El nombre es obligatorio").not().isEmpty(),
		validarCampos,
	],
	crearUsuario
);

// Login de usuario
router.post(
	"/",
	[
		check("email", "El email es obligatorio").isEmail(),
		check("password", "La constraseña es obligatoria").isLength({ min: 6 }),
		validarCampos,
	],
	login
);

// Validar y revalidar token de autenticaccion
router.get("/renew", [validarJWT], revalidarToken);
