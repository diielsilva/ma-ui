import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function unsignedIntegerSequence(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const value = control.value;

    for (let char of value) {
      const integer = Number.parseInt(char);
      const isNotAnInteger = !Number.isInteger(integer);

      if (isNotAnInteger) {
        return {
          unsignedIntegerSequence: { value: 'O campo selecionado aceita apenas números' },
        };
      }

      if (integer < 0) {
        return { unsignedIntegerSequence: { value: 'Apenas números positivos são aceitos' } };
      }
    }

    return null;
  };
}
