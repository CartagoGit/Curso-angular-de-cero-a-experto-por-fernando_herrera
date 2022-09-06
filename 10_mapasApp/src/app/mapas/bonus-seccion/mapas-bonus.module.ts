import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasBonusRoutingModule } from './mapas-bonus-routing.module';
import { MapScreenComponent } from './screens/map-screen/map-screen.component';
import { GeoPageComponent } from './screens/geo-page/geo-page.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [MapScreenComponent, GeoPageComponent, MapViewComponent, LoadingComponent],
  imports: [CommonModule, MapasBonusRoutingModule],
})
export class MapasBonusModule {}
