import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [],
})
export class DinamicosComponent {
  miFormulario: FormGroup = this.fb.group({
    nombre: ['Un nombre', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array(
      [['Metal Gear'], ['DeathStranding']],
      Validators.required
    ),
  });
  // arrayObject = [
  //   { id: 1, nombre: 'Metal Gear' },
  //   { id: 2, nombre: 'DeathStranding' },
  // ];

  // miFormulario: FormGroup = this.fb.group({
  //   nombre: ['Un nombre', [Validators.required, Validators.minLength(3)]],
  //   favoritos: this.fb.array([
  //     this.arrayObject.map((x) => {
  //       this.fb.group({
  //         id: this.fb.control(x.id),
  //         nombre_array: this.fb.control(x.nombre),
  //       });
  //     }),
  //   ]),
  // });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get getFavoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  campoEsInvalido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  guardar() {
    console.log(this.miFormulario.controls);
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    // this.miFormulario.reset();
    // this.miFormulario.controls['nombre'].reset();
  }

  agregar() {
    if (this.nuevoFavorito.invalid) return;

    // let nuevoFormControl: FormControl = new FormControl(
    //   this.nuevoFavorito.value,
    //   this.nuevoFavorito.validator
    // );

    let nuevoFormControl: FormControl = this.fb.control(
      this.nuevoFavorito.value,
      this.nuevoFavorito.validator
    );
    this.getFavoritosArr.push(nuevoFormControl);
    this.nuevoFavorito.reset();
  }

  eliminar(index: number) {
    this.getFavoritosArr.removeAt(index);
  }
}
