import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mapas',
    loadChildren: () =>
      import('./mapas/mapas.module').then((m) => m.MapasModule),
  },
  {
    path: 'mapas-bonus',
    loadChildren: () =>
      import('./bonus-seccion/mapas-bonus.module').then(
        (m) => m.MapasBonusModule
      ),
  },
  { path: '**', redirectTo: 'mapas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
