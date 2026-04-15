import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function hasAgeToEnroll(): ValidatorFn {
  return (control: AbstractControl<Date>): ValidationErrors | null => {
    const msToDay = 1000 * 60 * 60 * 24;
    const daysOfAYear = 365;
    const birthDateInDays = control.value.valueOf() / msToDay;
    const actualMomentInDays = Date.now() / msToDay;

    const userAge = (actualMomentInDays - birthDateInDays) / daysOfAYear;

    if (userAge < 12 || userAge > 120) {
      return { hasAgeToEnroll: { value: 'O usuário deve ter entre 12 e 120 anos' } };
    }

    return null;
  };
}
