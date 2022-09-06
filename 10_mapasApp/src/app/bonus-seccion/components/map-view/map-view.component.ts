import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styles: [
    `
      div {
        width: 100%;
        height: 100%;
        margin: 0px;
      }
    `,
  ],
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('idMap') divMapa!: ElementRef;
  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) {}

  ngAfterViewInit(): void {
    let map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: this.placesService.userLocation, // Latitud y Longitud, a la inversa que en google maps
      zoom: 1,
      projection: { name: 'globe' },
    });
    map.on('style.load', () => {
      map.setFog({
        color: '#010D59', // Lower atmosphere
        // 'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
        'horizon-blend': 0.0001, // Atmosphere thickness (default 0.2 at low zooms)
        // 'space-color': 'rgb(11, 11, 25)', // Background color
        // 'star-intensity': 0.6, // Background star brightness (default 0.35 at low zoooms )
        range: [0.8, 8],
      });
    });

    this.placesService.map = map; //Dos servicios porque me adelante a la clase y añadi todo en el otro servicio haciendolo por mi cuenta
    this.mapService.setMap(map);
  }
}
