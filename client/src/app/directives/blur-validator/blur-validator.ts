import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBlurValidator]',
  standalone: true
})
export class BlurValidatorDirective {
  @Input('appBlurValidator') validatorFormFn!: () => void;

  @HostListener('blur')
  onBlur() {
    if (this.validatorFormFn) {
      this.validatorFormFn();
    }
  }
}