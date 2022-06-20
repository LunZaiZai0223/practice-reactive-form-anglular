import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Optional, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appLabelChange]'
})
export class LabelChangeDirective implements OnInit, OnChanges {
  // 控制 directive 的事件是否要執行
  @Input() editId: string = '';
  @Input() isLabelNextSibling: boolean = false;
  clonedValue: string = '';
  labelElement: any | HTMLLabelElement = '';
  styleClassName: string = 'text-primary';

  // 直接依賴注入取得 formControl
  // @Optional -> 可有可無（元件化 -> 讓 directive 可以重複利用）
  // --> 就不用依賴 template 及 component 的資料傳遞，可以直接抓綁定 input 之 formControl
  constructor(private elementRef: ElementRef, private renderer: Renderer2, @Optional() private _control: NgControl) {}

  ngOnChanges():void {
    console.log('onChanges in directive');
    this.setLabelElement();
    this.removeChangedClass(this.labelElement, this.styleClassName);
    if(this.editId) {
      this.setClonedValue();
    }
  }

  ngOnInit():void {
  }

  @HostListener('input', ['$event']) onInput (eventData: Event) {
    // input value get ele value
    //   -> check diff with cloned
    //   -> check is empty
    //   -> then change color
    const currentValue: string = this._control.value;
    console.log(this._control);
    console.log(currentValue);
    console.log(this.clonedValue);

    if (!this.editId || !this.clonedValue) {
      console.log('現在是一般模式');
      return;
    }

    const isValueEmpty: boolean = this.checkValueIsEmpty(currentValue);
    if (isValueEmpty) {
      return this.removeChangedClass(this.labelElement, this.styleClassName);
    }

    const isValueDiff: boolean = this.checkValueDiff(this.clonedValue, currentValue);
    if (isValueDiff) {
      console.log(this._control);
      console.log(currentValue);
      console.log('is diff');
      this.addChangedClass(this.labelElement, this.styleClassName);
    } else {
      console.log('is same');
      return this.removeChangedClass(this.labelElement, this.styleClassName);
    }

  }

  checkValueDiff(clonedValue: string, currentValue: string): boolean {
    return String(clonedValue) !== currentValue;
  }

  checkValueIsEmpty(currentValue: string): boolean {
    return currentValue === '';
  }

  addChangedClass(labelElement: HTMLLabelElement, addedClassName: string): void {
    this.renderer.addClass(labelElement, addedClassName);
  }

  removeChangedClass(labelElement: HTMLLabelElement, removedClassName: string): void {
    this.renderer.removeClass(labelElement, removedClassName);
  }

  setClonedValue(): void {
    this.clonedValue = this._control.value;
  }

  setLabelElement(): void {
    this.labelElement = this.isLabelNextSibling ?
      ((<HTMLInputElement>this.elementRef.nativeElement).nextSibling as HTMLLabelElement) :
      ((<HTMLInputElement>this.elementRef.nativeElement).previousSibling as HTMLLabelElement);
  }

}
