import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeoPageComponent } from './screens/geo-page/geo-page.component';
import { MapScreenComponent } from './screens/map-screen/map-screen.component';
import { RutaPageComponent } from './screens/ruta-page/ruta-page.component';
import { SearchPageComponent } from './screens/search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    component: MapScreenComponent,
    children: [
      {
        path: 'geolocalizacion',
        component: GeoPageComponent,
      },
      {
        path: 'buscador',
        component: SearchPageComponent,
      },
      {
        path: 'rutas',
        component: RutaPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapasBonusRoutingModule {}
