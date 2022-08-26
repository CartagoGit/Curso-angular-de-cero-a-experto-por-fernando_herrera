import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, Observable, of } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarModalComponent } from '../../components/confirmar-modal/confirmar-modal.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 60%;
        border-radius: 20px;
        margin-bottom: 10px;
      }
      ::ng-deep snack-bar-container.mat-snack-bar-container {
        border-radius: 200px;
        border: 2px solid white;
      }
      ::ng-deep snack-bar-container.error-snackbar {
        background-color: #ff4040;
        color: white;
      }
      ::ng-deep snack-bar-container.success-snackbar {
        background-color: #8bf5c0;
        color: #303030;
      }

    `,
  ],
})
export class AgregarComponent implements OnInit {
  publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private matDialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) return;
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroePorId(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      this.mostrarSnackBar(
        'Falta el nombre del superheroe. El registro no ha sido guardado',
        'Cerrar',
        'error-snackbar'
      );
      return;
    }

    if (this.heroe.id) {
      //ACtualizar
      this.heroesService.actualizarHeroe(this.heroe).subscribe({
        next: (heroe) => {
          this.mostrarSnackBar('Heroe actualizado');
          this.heroe = { ...heroe };
        },
      });
    } else {
      //Crear Heroe
      this.heroesService.agregarHeroe(this.heroe).subscribe({
        next: (heroe) => {
          this.mostrarSnackBar('Nuevo heroe guardado');
          this.router.navigate(['/heroes/editar', heroe.id]);
        },
      });
    }
  }
  eliminar() {
    const modal = this.matDialog.open(ConfirmarModalComponent, {
      width: '90vw',
      height: '90vh',
      maxWidth: '350px',
      maxHeight: '250px',
      data: { ...this.heroe },
    });

    modal
      .afterClosed()
      .pipe(
        switchMap((resp: boolean) =>
          resp ? this.heroesService.borrarHeroe(this.heroe.id!) : of(false)
        )
      )
      .subscribe({
        next: (result: boolean) => {
          console.log(result);
          if (result) {
            this.mostrarSnackBar('El heroe se ha eliminado correctamente');
            this.router.navigate(['/heroes']);
          } else {
            this.mostrarSnackBar(
              'Se ha cancelado la eliminación del heroe',
              'Cerrar',
              'error-snackbar'
            );
          }
        },
      });

    // .afterClosed()
    //   .subscribe({
    //   next: (result) => {
    //     if (result) {
    //       C.subscribe({
    //         next: () => {
    //           this.mostrarSnackBar('El heroe se ha eliminado correctamente');
    //           this.router.navigate(['/heroes']);
    //         },
    //       });
    //     } else {
    //       this.mostrarSnackBar(
    //         'Se ha cancelado la eliminación del heroe',
    //         'Cerrar',
    //         'error-snackbar'
    //       );
    //     }
    //   },
    // });
  }

  mostrarSnackBar(
    mensaje: string,
    mensajeBoton: string | undefined = 'Cerrar',
    estilos: string | string[] | undefined = 'success-snackbar'
  ) {
    this.snackBar.open(mensaje, mensajeBoton, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2500,
      panelClass: estilos,
    });
  }
}
