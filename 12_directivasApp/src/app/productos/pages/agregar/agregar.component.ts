import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
  });

  texto1: string = 'El error que sea';
  color: string = 'red';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  tieneError(campo: string): boolean {
    // console.log(this.miFormulario.get(campo)?.invalid);
    return this.miFormulario.get(campo)?.invalid || false;
  }

  cambiarNombre() {
    this.texto1 = Math.random().toString();
    // this.texto1 = 'Juan Carlos';
    // console.log(this.texto1);
  }
  cambiarColor() {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    // console.log(color);
    this.color = color;
  }
}
