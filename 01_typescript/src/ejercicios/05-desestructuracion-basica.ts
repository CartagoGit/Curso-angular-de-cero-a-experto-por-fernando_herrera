console.log("Desestructuracion basica");

/*
    ===== Código de TypeScript =====
*/

interface IReproductor {
	volumen: number;
	segundo: number;
	cancion: string;
	detalles: IDetalles;
}

interface IDetalles {
	autor: string;
	anio: number;
}

const reproductor: IReproductor = {
	volumen: 90,
	segundo: 36,
	cancion: "Mess",
	detalles: {
		autor: "Ed Sheeran",
		anio: 2015
	}
};

console.log("El volumen actual es: ", reproductor.volumen);
console.log("El segundo actual es: ", reproductor.segundo);
console.log("La cancion actual es: ", reproductor.cancion);
console.log("El autor es: ", reproductor.detalles.autor);

console.log("-");

// Desestructuración

const {
	volumen,
	segundo,
	cancion,
	detalles: { autor }
} = reproductor;
// const { volumen, segundo,  cancion, detalles } = reproductor;
// const { autor } = detalles;

console.log("El volumen actual es: ", volumen);
console.log("El segundo actual es: ", segundo);
console.log("La cancion actual es: ", cancion);
console.log("El autor es: ", autor);

console.log("-ARREGLOS");

// ARREGLOS
const dbz: string[] = ["Goku", "Vegeta", "Trunks"];

console.log("Personaje 1: ", dbz[0]);
console.log("Personaje 2: ", dbz[1]);
console.log("Personaje 3: ", dbz[2]);

console.log("-");

// Desestructuración
const [goku, vegeta, trunks] = dbz;

console.log("Personaje 1: ", goku);
console.log("Personaje 2: ", vegeta);
console.log("Personaje 3: ", trunks);
