import { calculaISV, IProducto } from "./06-destructuracion-funcion";

console.log("Importaciones y exportaciones");

/*
    ===== Código de TypeScript =====
*/

const carritoCompras: IProducto[] = [
	{
		desc: "Telefono 1",
		precio: 100
	},
	{
		desc: "Telefono 2",
		precio: 130
	}
];

const [total, isv] = calculaISV(carritoCompras);

console.log("Total: ", total);
console.log("ISV: ", isv);
