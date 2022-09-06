import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeoPageComponent } from './screens/geo-page/geo-page.component';
import { MapScreenComponent } from './screens/map-screen/map-screen.component';

const routes: Routes = [
  {
    path: '',
    component: MapScreenComponent,
    children: [
      {
        path: 'geolocalizacion',
        component: GeoPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapasBonusRoutingModule {}
