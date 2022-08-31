import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService implements AsyncValidator {
  constructor(private http: HttpClient) {}
  validate(
    control: AbstractControl<any, any>
  ): Observable<ValidationErrors | null> {
    //Creamos la ruta para hacer la consulta asincrona
    const endpoint = 'usuarios?q=';
    const email = control.value as String;
    const fullUrl = `${environment.baseUrl}/${endpoint}${email}`;
    const messageError = { emailOcupado: true };
    // mapeamos la respuesta de la api, para devolver el observable que necesitamos
    // En este caso devolver el error si la validacion no pasa
    // En caso de que el email no existe en la base de datos, devolvemos la validacion en null
    return this.http.get<any[]>(fullUrl).pipe(
      // delay(3000),

      map((resp) => {
        //Comprobacion si ni hay respuesta devolvemos que no existe el email en la bd
        // en caso contrario comprobamos de que ninguna de las respuestas coincida exactament con el email

        if (resp.length === 0) return null;
        else {
          //Por cada coincidencia, comprueba que no coincida con el email
          //Si alguna coincide, el email esta ocupado
          for (let i = 0; i < resp.length; i++) {
            if (
              (resp[i].email as String).trim().toLowerCase() ===
              email.trim().toLowerCase()
            )
              return messageError;
          }
          return null;
        }

        //respuesta acortada de Fernando en el curso
        // return resp.length === 0 ? null : { emailOcupado: true };
      })
    );
  }
}
