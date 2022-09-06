import { Component, OnInit } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';
import { MapService } from '../../services/map.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ruta-page',
  templateUrl: './ruta-page.component.html',
  styles: [
    `
      .ruta-container {
        background-color: white;
        border-radius: 5px;
        border: 1px solid grey;
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
        padding: 5px;
        position: fixed;
        right: 20px;
        top: 20px;
        width: 270px;
      }
    `,
  ],
})
export class RutaPageComponent implements OnInit {
  private _map!: Map;
  markers: Marker[] = [];

  get hayRuta() {
    return this.apiSevice.hayRuta;
  }

  get estaCargandoRuta() {
    return this.apiSevice.estaCargandoRutas;
  }

  get distance() {
    return this.mapService.distance;
  }
  get time() {
    return this.mapService.time;
  }

  constructor(private mapService: MapService, private apiSevice: ApiService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._map = this.mapService.getMap();
    if (!this._map) {
      this.mapService.mapChange.subscribe({
        next: (map: Map) => {
          this._map = map;
          this.capturarClickEnMapa();
        },
      });
    } else this.capturarClickEnMapa();
  }
  ngOnDestroy(): void {
    this._map.off('click', this.crearMarcador);
    this.mapService.removeMarkers();
  }

  capturarClickEnMapa() {
    this._map.on('click', this.crearMarcador);
  }

  // IMPORTANTE
  // AL SER UN METODO ESTATICO/LISTENER (desde el map.on), SE PUEDE MANDAR LA FUNCION COMO UNA FUNCION DE FLECHA, O PERDERA EL SCOPE CON EL RESTO DE LA CLASE
  crearMarcador = (e: any) => {
    const { lng, lat } = e.lngLat;
    const markers = this.mapService.createMarkersForRoutes(lng, lat);
    this.markers = markers;
    if (markers.length < 2) return;
    const { lng: lng0, lat: lat0 } = markers[0].getLngLat();
    const { lng: lng1, lat: lat1 } = markers[1].getLngLat();
    this.apiSevice.getRouteBetweenPoints([lng0, lat0], [lng1, lat1]);
  };
}
