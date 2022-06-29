import { NgModule } from '@angular/core';
import { ContadorComponent } from './contador/contandor.component';
import { ContadorPruebaComponent } from './contador-prueba/contandor-prueba.component';

@NgModule({
  declarations: [ContadorComponent, ContadorPruebaComponent],
  exports: [ContadorComponent, ContadorPruebaComponent],
  imports: [],
})
export class ContadorModule {}
