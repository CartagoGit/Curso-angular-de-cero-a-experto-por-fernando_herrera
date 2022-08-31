import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//INFORMACION EN EL ARCHIVO
// import {
//   emailPattern,
//   nombreApellidoPattern,
//   noPuedeSerStrider,
// } from '../../../shared/validators/validaciones';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(this.vs.nombreApellidoPattern),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.vs.emailPattern)],
        [this.evs],
      ],
      username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [this.vs.camposIguales('password', 'password2')],
    }
  );

  // emailErrorMsg: string = '';

  get emailErrorMsg(): string | null {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.['required']) return 'El email es obligatorio';
    else if (errors?.['pattern'])
      return 'El formato del correo no es el correcto';
    else if (errors?.['emailOcupado'])
      return 'El email ya se encuentra registrado';
    return null;
  }

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorService,
    private evs: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Mario Cabvol',
      email: 'unEmail@cualquiera.com',
      username: 'stride',
      password: 'una contraseña cualquiera',
      password2: 'una contraseña cualquiera',
    });
  }

  campoEsValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  // emailRequied() {
  //   return (
  //     this.miFormulario.get('email')?.errors?.['required'] &&
  //     this.miFormulario.get('email')?.touched
  //   );
  // }
  // emailFormato() {
  //   return (
  //     this.miFormulario.get('email')?.errors?.['pattern'] &&
  //     this.miFormulario.get('email')?.touched
  //   );
  // }
  // emailOcupado() {
  //   return (
  //     this.miFormulario.get('email')?.errors?.['emailOcupado'] &&
  //     this.miFormulario.get('email')?.touched
  //   );
  // }

  submitFormulario() {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }
}
