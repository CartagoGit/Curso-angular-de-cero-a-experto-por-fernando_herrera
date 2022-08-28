import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BasicosComponent } from './basicos/basicos.component';
import { CustomMinDirective } from './directives/custom-min.directive';
import { DinamicosComponent } from './dinamicos/dinamicos.component';
import { SwitchesComponent } from './switches/switches.component';
import { TemplateRoutingModule } from './template-routing.module';

@NgModule({
  declarations: [
    SwitchesComponent,
    BasicosComponent,
    DinamicosComponent,
    CustomMinDirective,
  ],
  imports: [CommonModule, TemplateRoutingModule, FormsModule],
})
export class TemplateModule {}
