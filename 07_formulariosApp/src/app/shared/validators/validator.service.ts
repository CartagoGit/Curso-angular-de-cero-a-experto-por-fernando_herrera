import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { EmptyError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  noPuedeSerStrider = (control: FormControl): ValidationErrors | null => {
    const valor = (control.value as String)?.trim().toLowerCase();
    // const valor = (control.value.toString()).trime;
    // console.log(valor);
    if (valor === 'strider')
      return {
        errorCustom: {
          desc: 'La palabra no puede ser strider',
          noStrider: 'true',
        },
      };
    return null;
  };

  camposIguales(campo1: string, campo2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      // Comprobamos la propiedad "noIguales" en el objeto, y como dicha propiedad
      // no existe en ValidatorErrors, en caso de que no exista saca los parametros
      // de un objeto vacio. Y sacamos el resto de errores que pueda tener el campo
      const { noIguales = null, ...otherErrors } =
        formGroup.get(campo2)?.errors || {};

      if (pass1 !== pass2) {
        // En caso de que no sean iguales añadimos el error 'noIguales' al resto de
        // errores que ya teniamos (con la desestructuracion del resto de errores)
        // ya que en caso de no haber errores solo quedara el nuevo error, y en caso de
        // haber mas errores, lo añadiriamos a los ya existentes.
        formGroup.get(campo2)?.setErrors({ noIguales: true, ...otherErrors });
        return { noIguales: true };
      }

      //En caso de que si sean iguales y no añadamos el nuevo error.
      // Comprobamos si hay mas errores comprobando si el resto de errores es 0
      // Si no hay mas errores, eliminamos la lista de errores como Fernando
      if (Object.keys(otherErrors).length === 0)
        formGroup.get(campo2)?.setErrors(null);
      // Si hay mas errores, los volvemos a colocar en los errores del campo
      else formGroup.get(campo2)?.setErrors({ ...otherErrors });
      return null;
    };
  }
}
