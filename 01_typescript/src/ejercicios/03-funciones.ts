console.log("Funciones");

/*
    ===== Código de TypeScript =====
*/

// function sumar(a:number , b:number) {
// 	return (a + b).toString();
// }
function sumar(a: number, b: number): number {
	return a + b;
}

const sumarFlecha = (a: number, b: number): number => a + b;

function multiplicar(
	numero: number,
	otroNumero?: number,
	base: number = 2
): number {
	return numero * base;
}

// const resultado = sumar ('Fernando'," Herrera");
const resultado = sumar(9, 10);
console.log(resultado);

console.log(sumarFlecha(5, 2));

const resultado2 = multiplicar(10, 0, 20);
console.log(resultado2);

interface PersonajeLOR {
	nombre: string;
	pv: number;
	mostrarHp: () => void;
}

function curar(personaje: PersonajeLOR, curarX: number): void {
	personaje.pv += curarX;

	console.log(personaje);
}

const nuevoPersonaje: PersonajeLOR = {
	nombre: "Strider",
	pv: 50,
	mostrarHp() {
		console.log("Puntos de vida", this.pv);
	}
};

curar(nuevoPersonaje, 20);

nuevoPersonaje.mostrarHp();
