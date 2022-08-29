import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [],
})
export class SwitchesComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    terminos: [false, Validators.requiredTrue],
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.miFormulario.reset({ ...this.persona, terminos: false });

    this.miFormulario
      .get('terminos')
      ?.valueChanges.subscribe((controlValue) => {
        console.log(controlValue);
      });

    // this.miFormulario.valueChanges.subscribe((formValue) => {
    //   console.log(formValue);
    //   delete formValue.terminos;
    //   this.persona = formValue;
    // });
    this.miFormulario.valueChanges.subscribe(
      ({ terminos, ...elRestoDeArgumentos }) => {
        this.persona = elRestoDeArgumentos;
      }
    );
  }

  guardar() {
    // const formValue = {...this.miFormulario.value}
    // delete formValue.terminos;
    // console.log(formValue);
    // this.persona = formValue;
  }
}
