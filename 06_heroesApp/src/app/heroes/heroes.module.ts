import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialDesignModule } from '../material-design/material-design.module';

import { HeroesRoutingModule } from './heroes-routing.module';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroeTarjetaComponent } from './components/heroe-tarjeta/heroe-tarjeta.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';

import { ImagenPipe } from './pipes/imagen.pipe';
import { ConfirmarModalComponent } from './components/confirmar-modal/confirmar-modal.component';

@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    HeroeComponent,
    HeroeTarjetaComponent,
    HomeComponent,
    ListadoComponent,
    ImagenPipe,
    ConfirmarModalComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialDesignModule,
    HeroesRoutingModule,
  ],
})
export class HeroesModule {}
