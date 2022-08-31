
// esto seria una forma de mantenerlo accesible desde cualquier lado de la app
// de todas formas lo haremos de otra forma, en modo de servicio para evitar problemas en consultas mas extensas

import { FormControl } from '@angular/forms';

export const nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string =
  '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

export const noPuedeSerStrider = (control: FormControl) => {
  const valor = (control.value as String)?.trim().toLowerCase();
  // const valor = (control.value.toString()).trime;
  console.log(valor);
  if (valor === 'strider')
    return {
      errorCustom: {
        desc: 'La palabra no puede ser strider',
        noStrider: 'true',
      },
    };
  return null;
};
