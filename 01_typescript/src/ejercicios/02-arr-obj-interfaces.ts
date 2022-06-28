console.log("Arrays, objetos e interfaces");

/*
    ===== Código de TypeScript =====
*/

let habilidades: string[] = [];

// habilidades.push(1);
interface Personaje {
	nombre: string;
	hp: number;
	habilidades: string[];
	puebloNatal?: string;
}

const personaje: Personaje = {
	nombre: "Strider",
	hp: 100,
	habilidades: ["Bash", "Counter", "Healing"],
};
console.table(personaje);
console.log(personaje.puebloNatal);
personaje.puebloNatal = "Pueblo Paleta";
console.table(personaje);
