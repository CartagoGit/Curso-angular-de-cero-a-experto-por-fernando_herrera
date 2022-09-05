import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { router } from "./routes/auth.routes";
import { dbConnection } from "./db/config";

//Activamos la lectura de las variables de entorno
dotenv.config();
const PORT = process.env.PORT;

//Creamos el servidor
const app = express();
// Conexion a la base de datos
dbConnection();

// Directorio publico
app.use(express.static("src/public"));

//CORS
app.use(cors());

//Lectura y parseo del body
// Parse para convertir todo lo pasado en la app por un json
app.use(express.json());

// RUTAS
app.use("/api/auth", router);

//Manejar demas rutas
app.get("*", (_req, res) => {
	res.sendFile(path.resolve(__dirname, "public/index.html"));
});

// Creamos la llamada al servidor
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
