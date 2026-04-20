import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenCpf(sessionOwnerCpf: string): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const searchedCpf = control.value;

    if (sessionOwnerCpf === searchedCpf) {
      return {
        forbiddenCpf: {
          value: 'Para acessar seus pedidos de inscrição, vá para a página dos meus pedidos',
        },
      };
    }

    return null;
  };
}
