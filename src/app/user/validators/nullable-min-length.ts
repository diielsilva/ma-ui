import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nullableMinLength(minLength: number): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const value = control.value;

    if (minLength < 0) {
      minLength = 0;
    }

    if (value !== '' && value.length < minLength) {
      return { nullableMinLength: { value: '' } };
    }

    return null;
  };
}
