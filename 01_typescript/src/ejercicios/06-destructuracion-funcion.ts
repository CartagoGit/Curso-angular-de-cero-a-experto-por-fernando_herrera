console.log("Desestructuracion de funciones");

/*
    ===== Código de TypeScript =====
*/

export interface IProducto {
	desc: string;
	precio: number;
}

const telefono: IProducto = {
	desc: "Nokia A1",
	precio: 150
};

const tableta: IProducto = {
	desc: "iPad Air",
	precio: 350
};

export function calculaISV(productos: IProducto[]): [number, number] {
	let total = 0;
	productos.forEach(({ precio }) => {
		total += precio;
	});

	return [total, total * 0.15];
}

const articulos = [telefono, tableta];

// const isv = calculaISV(articulos);
const [total, isv] = calculaISV(articulos);

console.log("Total: ", total);
console.log("ISV: ", isv);
