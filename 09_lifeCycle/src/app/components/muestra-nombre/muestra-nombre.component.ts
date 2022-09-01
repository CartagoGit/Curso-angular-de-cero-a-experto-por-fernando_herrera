import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-muestra-nombre',
  templateUrl: './muestra-nombre.component.html',
  styles: [],
})
export class MuestraNombreComponent implements OnInit, OnChanges {
  @Input() nombre!: string;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges en componente muestra nombre', changes);
  }
}
