import jwt, { Secret } from "jsonwebtoken";

export const generarJWT = (uid: string, name: string): Promise<string> => {
	const payload = { uid, name };

	//Ya que jwt no trabaja con promesas creamos una para que nos devuelva el resultado en cuanto termine el proceso
	return new Promise((resolve, reject) => {
		//Creamos la firma para el jwt
		jwt.sign(
			// PAYLOAD con la info
			payload,
			//SECRET SEED
			process.env.SECRET_JWT_SEED as Secret,
			// OPTIONS
			{
				expiresIn: "24h",
			},
			// CALLBACK, donde devolvemos el resultado
			(err, token) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(token!);
				}
			}
		);
	});
};
