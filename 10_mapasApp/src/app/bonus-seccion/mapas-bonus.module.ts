import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasBonusRoutingModule } from './mapas-bonus-routing.module';
import { MapScreenComponent } from './screens/map-screen/map-screen.component';
import { GeoPageComponent } from './screens/geo-page/geo-page.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchPageComponent } from './screens/search-page/search-page.component';
import { RutaPageComponent } from './screens/ruta-page/ruta-page.component';

@NgModule({
  declarations: [
    MapScreenComponent,
    GeoPageComponent,
    MapViewComponent,
    LoadingComponent,
    SearchBarComponent,
    SearchResultsComponent,
    SearchPageComponent,
    RutaPageComponent,
  ],
  imports: [CommonModule, MapasBonusRoutingModule],
})
export class MapasBonusModule {}
