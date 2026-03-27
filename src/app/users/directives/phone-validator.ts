import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const regex = new RegExp('^(?:55)?\\d{2}9\\d{8}$');

    const phone = control.value;

    const isInvalid = !regex.test(phone);

    return isInvalid ? { phone: { value: control.value } } : null;
  };
}
