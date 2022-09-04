import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[customIf]',
})
export class CustomIfDirective implements OnDestroy {
  @Input() set customIf(condicion: boolean) {
    if (condicion) this.viewContainer.createEmbeddedView(this.templateRef);
    // else this.viewContainer.remove();
    else this.viewContainer.clear();
  }

  constructor(
    private templateRef: TemplateRef<HTMLElement>,
    private viewContainer: ViewContainerRef
  ) {
    console.log('Se crea');
  }

  ngOnDestroy(): void {
    console.log('Se destruye');
  }
}
