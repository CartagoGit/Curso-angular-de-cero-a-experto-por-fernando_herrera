import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-confirmar-modal',
  templateUrl: './confirmar-modal.component.html',
  styles: [
    `
      .mat-dialog-container {
        width: 90%;
      }
    `,
  ],
})
export class ConfirmarModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public heroe: Heroe
  ) {}

  ngOnInit(): void {}

  borrar() {
    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
