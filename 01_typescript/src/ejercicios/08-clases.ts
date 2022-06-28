

console.log("Clases basicas");

/*
    ===== Código de TypeScript =====
*/

// class Heroe {
// 	private alterEgo: string;
// 	public edad: number;
// 	static nombreReal: number;
// }

class HeroeComparar {
	alterEgo: string;
	edad: number;
	nombreReal: string;

	imprimirNombre() {
		return this.alterEgo + " " + this.nombreReal;
	}
}

interface PersonajeComparar {
	alterEgo?: string;
	edad?: number;
	nombreReal?: string;

	imprimirNombre?: () => string;
}

const superman = new HeroeComparar();
const spiderman: PersonajeComparar = {};

console.log(superman);
console.log(spiderman);

console.log("-CLASES BASICAS");

class Heroe {
	// alterEgo: string;
	// edad: number;
	// nombreReal: string;

	constructor(
		public alterEgo: string,
		public edad?: number,
		public nombreReal?: string
	) {
		console.log("hey");
		// this.alterEgo = alterEgo;
	}
}

const ironman = new Heroe("Ironman");
const ironman2 = new Heroe("Ironman", 45, "Tony");

console.log(ironman);
console.log(ironman2);

// Clases extendidas

class PersonaNormal {
	constructor(public nombre: string, public direccion: string) {}
}

class HeroeExtendida extends PersonaNormal {
	constructor(
		nombreReal: string,
		public alterEgo?: string,
		public edad?: number
	) {
		super(nombreReal, "New York");
		console.log("hey");
		// this.alterEgo = alterEgo;
	}
}
const ironmanExtendido = new HeroeExtendida('Tony Stark');
console.log(ironmanExtendido);
