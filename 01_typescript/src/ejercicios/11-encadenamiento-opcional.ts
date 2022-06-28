console.log("Encadenamiento");

/*
    ===== Código de TypeScript =====
*/

interface IPasajero {
	nombre: string;
	hijos?: string[];
}

const pasajero1: IPasajero = {
	nombre: "Fernando"
};

const pasajero2: IPasajero = {
	nombre: "Melisa",
	hijos: ["Natalia", "Gabriel"]
};

function imprimeHijos(pasajero: IPasajero): void {
	const { hijos } = pasajero;
	const cuantosHijos = hijos?.length || 0;
	console.log(cuantosHijos);
}

imprimeHijos(pasajero2);
imprimeHijos(pasajero1);
