import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgChartsModule } from 'ng2-charts';

import { GraficasRoutingModule } from './graficas-routing.module';
import { BarrasComponent } from './pages/barras/barras.component';
import { DonaHttpComponent } from './pages/dona-http/dona-http.component';
import { DonaComponent } from './pages/dona/dona.component';
import { BarrasDoblesComponent } from './pages/barras-dobles/barras-dobles.component';
import { GraficaBarraComponent } from './components/grafica-barra/grafica-barra.component';

@NgModule({
  declarations: [
    BarrasComponent,
    BarrasDoblesComponent,
    DonaComponent,
    DonaHttpComponent,
    GraficaBarraComponent,
  ],
  imports: [CommonModule, NgChartsModule, GraficasRoutingModule],
})
export class GraficasModule {}

