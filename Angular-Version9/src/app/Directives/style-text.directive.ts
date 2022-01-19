import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStyleText]'
})
export class StyleTextDirective {

  constructor(private element: ElementRef, private render: Renderer2) {
    // ! Cách 1
    // element.nativeElement.style.color ="red";
    // element.nativeElement.style.fontWeight = '100';

    //? Cách 2
    render.setStyle(element.nativeElement, 'color', 'red');
    render.setStyle(element.nativeElement, 'fontSize', '20px');
   }

}
