import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const regexes = [
      new RegExp('([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}-[0-9]{2})|([0-9]{11})'),
      new RegExp('^(?:(?!000\\.?000\\.?000-?00).)*$'),
      new RegExp('^(?:(?!111\\.?111\\.?111-?11).)*$'),
      new RegExp('^(?:(?!222\\.?222\\.?222-?22).)*$'),
      new RegExp('^(?:(?!333\\.?333\\.?333-?33).)*$'),
      new RegExp('^(?:(?!444\\.?444\\.?444-?44).)*$'),
      new RegExp('^(?:(?!555\\.?555\\.?555-?55).)*$'),
      new RegExp('^(?:(?!666\\.?666\\.?666-?66).)*$'),
      new RegExp('^(?:(?!777\\.?777\\.?777-?77).)*$'),
      new RegExp('^(?:(?!888\\.?888\\.?888-?88).)*$'),
      new RegExp('^(?:(?!999\\.?999\\.?999-?99).)*$'),
    ];

    const cpf = control.value;

    for (const regex of regexes) {
      if (!regex.test(cpf)) {
        return { cpf: { value: control.value } };
      }
    }

    return null;
  };
}
