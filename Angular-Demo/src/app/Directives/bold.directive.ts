import { Directive, ElementRef, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appBold]'
})
export class BoldDirective {
  constructor(private element: ElementRef, private render: Renderer2) {
    element.nativeElement.style.color = 'blue';
    // Cach1
    render.setStyle(element.nativeElement, 'color', 'red');
    // Cach2
  }

}