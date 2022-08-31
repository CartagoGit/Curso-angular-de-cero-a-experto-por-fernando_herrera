import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interfaces/pais.interface';
import { switchMap, tap, of } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  //llenar selectores
  regiones: string[] | null = [];
  paises: PaisSmall[] | null = [];
  // fronteras: string[] | null = [];
  fronteras: PaisSmall[] | null = [];

  // UI
  cargando: boolean = false;
  error: boolean = false;
  estaFronteraSeleccionada: boolean = false;

  constructor(private fb: FormBuilder, private paisesService: PaisesService) {}

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    // SIN SWITCH MAP
    // this.miFormulario.get('region')?.valueChanges.subscribe({
    //   next: (region) => {
    //     this.paisesService.getPaisesPorRegion(region).subscribe({
    //       next: (paises) => {
    //         this.paises = paises;
    //       },
    //     });
    //   },
    // });

    // CON SWITCH MAP
    this.miFormulario
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.error = false;
          this.cargando = true;
          this.paises = [];
          this.miFormulario.get('pais')?.reset('');
        }),
        switchMap((region: string) => {
          return this.paisesService.getPaisesPorRegion(region);
        })
      )
      .subscribe({
        next: (paises) => {
          this.paises = paises ? paises : [];
          this.cargando = false;
        },
        error: (error) => {
          console.error(
            'Hubo un error al cargar los datos desde la API al cambiar región: ',
            error
          );
          this.cargando = false;
          this.error = true;
        },
      });

    this.miFormulario
      .get('pais')
      ?.valueChanges.pipe(
        tap((_) => {
          this.error = false;
          this.cargando = true;
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
        }),
        switchMap((paisCode) => {
          return this.paisesService.getPaisPorCodigo(paisCode);
        }),
        switchMap((pais) => {
          if (!pais) return of(null);
          return this.paisesService.getPaisesPorCodigos(pais![0]?.borders!);
        })
      )
      .subscribe({
        next: (paisesFronterizos) => {
          this.cargando = false;
          if (!this.miFormulario.get('pais')?.value) return;
          if (!paisesFronterizos || paisesFronterizos.length === 0) {
            this.fronteras = [
              {
                name: { common: 'No tiene fronteras terrestres' },
                cca3: 'NULL',
              },
            ];
            this.miFormulario.get('frontera')?.reset('NULL');
          } else this.fronteras = paisesFronterizos;

          // this.fronteras = !pais
          //   ? []
          //   : pais[0].borders
          //   ? pais[0].borders
          //   : ['No tiene fronteras'];
        },
        error: (error) => {
          console.error(
            'Hubo un error al cargar los datos desde la API al cambiar país: ',
            error
          );
          this.cargando = false;
          this.error = true;
        },
      });

    this.miFormulario.get('frontera')?.valueChanges.subscribe({
      next: (fronteraSeleccionada) => {
        this.estaFronteraSeleccionada =
          fronteraSeleccionada === '' ? false : true;
      },
    });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
