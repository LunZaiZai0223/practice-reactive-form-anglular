import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAgeChange]'
})
export class AgeChangeDirective {

  constructor() { }
  @HostListener('change', ['$event']) onChange(eventData: Event) {
    console.log(eventData.target);
  }

}
