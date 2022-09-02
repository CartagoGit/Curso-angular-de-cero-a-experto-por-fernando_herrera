import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        height: 100%;
        width: 100%;
      }

      .row {
        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        position: fixed;
        z-index: 100;
        width: 35%;
      }
      button {
        width: 40px;
      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-5.965045218532293, 37.397177870864695];

  constructor() {}

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      // container: 'mapa',
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center, // Latitud y Longitus, a la inversa que en google maps
      zoom: this.zoomLevel,
    });

    // REGLA DE ORO, CUANDO SE CREA UN LISTENER HAY QUE DESTRUIRLO
    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 20) this.mapa.zoomTo(20);
      else if (this.mapa.getZoom() < 0.5) this.mapa.zoomTo(0.5);
    });

    this.mapa.on('move', (ev) => {
      const { lng, lat } = this.mapa.getCenter();
      this.center = [lng, lat];
    });
  }

  zoomOut(): void {
    this.mapa.zoomOut();
  }

  zoomIn(): void {
    this.mapa.zoomIn();
  }

  zoomCambio(valor: string): void {
    this.mapa.zoomTo(Number(valor));
  }
}
