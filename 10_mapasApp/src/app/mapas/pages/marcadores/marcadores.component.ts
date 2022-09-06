import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container {
        height: 100%;
        width: 100%;
      }

      .list-group {
        position: fixed;
        right: 20px;
        top: 20px;
        z-index: 90;
      }
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MarcadoresComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-5.965045218532293, 37.397177870864695];
  marcadores: MarcadorColor[] = [];

  constructor() {}

  ngOnDestroy(): void {
    this.mapa.off('move', () => {});
    this.marcadores.forEach((m) => {
      m.marker?.off('dragend', () => {});
    });
  }
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center, // Latitud y Longitus, a la inversa que en google maps
      zoom: this.zoomLevel,
      projection: { name: 'naturalEarth' },
    });

    this.leerLocalStorage();

    this.mapa.on('move', (ev) => {
      const { lng, lat } = this.mapa.getCenter();
      this.center = [lng, lat];
    });
    //PARA AGREGAR MARCADORES PERSONALIZADOS
    // const marketHtml: HTMLElement = document.createElement('div');
    // marketHtml.innerHTML = 'Hola Mundo'
    // const marker = new mapboxgl.Marker({
    //   element: marketHtml
    // })
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);
  }

  agregarMarcador() {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    this.crearMarcador(color, this.center);
  }

  crearMarcador(color: string, center: [number, number]) {
    const nuevoMarcador = new mapboxgl.Marker({ draggable: true, color })
      .setLngLat(center)
      .addTo(this.mapa);

    this.marcadores.push({ marker: nuevoMarcador, color });

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    });

    this.guardarMarcadoresLocalStorage();
  }

  irMarcador({ marker }: MarcadorColor) {
    this.mapa.flyTo({ center: marker!.getLngLat() });
  }

  borrarMarcador(i: number) {
    this.marcadores[i].marker?.off('dragend', () => {});
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarcadoresLocalStorage();
  }

  guardarMarcadoresLocalStorage() {
    const lngLatArr: MarcadorColor[] = [];
    this.marcadores.forEach((m) => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();
      lngLatArr.push({
        color,
        center: [lng, lat],
      });
    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage() {
    if (!localStorage.getItem('marcadores')) return;

    const lngLatArr: MarcadorColor[] = JSON.parse(
      localStorage.getItem('marcadores')!
    );

    lngLatArr.forEach((marker) => {
      this.crearMarcador(marker.color, marker.center!);
    });
  }
}
