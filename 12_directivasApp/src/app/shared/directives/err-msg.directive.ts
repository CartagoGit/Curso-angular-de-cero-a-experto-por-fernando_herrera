import {
  Directive,
  OnInit,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[error-msg]',
})
export class ErrMsgDirective implements OnInit, OnChanges {
  htmlElement: ElementRef<HTMLElement>;
  // @Input() color: string = 'red';

  private _color: string = 'red';
  @Input() set color(valor: string) {
    // this.htmlElement.nativeElement.style.color = valor;
    this._color = valor;
    this.setColor();
  }

  // @Input() mensaje: string = 'Este campo es necesario';
  private _mensaje: string = 'Este campo es requerido';
  @Input() set mensaje(valor: string) {
    // this.htmlElement.nativeElement.innerText = valor;
    this._mensaje = valor;
    this.setMensaje();
  }

  @Input() estilos: string = 'form-text';

  @Input() set valido(valor: boolean) {
    if (!valor) this.htmlElement.nativeElement.classList.add('hidden');
    else this.htmlElement.nativeElement.classList.remove('hidden');
  }

  constructor(el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setColor();
    this.setMensaje();
    this.setStyleClass();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    // if (changes['mensaje']) {
    //   const mensaje = changes['mensaje'].currentValue;
    //   this.htmlElement.nativeElement.innerText = mensaje;
    // }
    // if (changes['color']) {
    //   const color = changes['color'].currentValue;
    //   this.htmlElement.nativeElement.style.color = color;
    // }
  }

  setColor(): void {
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setMensaje(): void {
    this.htmlElement.nativeElement.innerText = this._mensaje;
  }

  setStyleClass() {
    this.htmlElement.nativeElement.classList.add(this.estilos);
  }
}
