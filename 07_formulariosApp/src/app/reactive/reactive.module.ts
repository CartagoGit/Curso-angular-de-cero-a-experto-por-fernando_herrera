import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { BasicosComponent } from './basicos/basicos.component';
import { DinamicosComponent } from './dinamicos/dinamicos.component';
import { ReactiveRoutingModule } from './reactive-routing.module';
import { SwitchesComponent } from './switches/switches.component';

@NgModule({
  declarations: [BasicosComponent, DinamicosComponent, SwitchesComponent],
  imports: [CommonModule, ReactiveRoutingModule, ReactiveFormsModule],
})
export class ReactiveModule {}
