import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { PlacesService } from '../../services/places.service';

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
  constructor(private palcesService: PlacesService) {}

  ngAfterViewInit(): void {
    console.log(this.palcesService.userLocation);

    console.log(this.divMapa);
    var map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.palcesService.userLocation, // Latitud y Longitus, a la inversa que en google maps
      zoom: 15,
    });
  }
}
