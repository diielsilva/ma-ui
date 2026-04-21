import { FormControl } from '@angular/forms';

export interface UpdateUserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  cpf: FormControl<string>;
  phone: FormControl<string>;
  gender: FormControl<string>;
  birthDate: FormControl<Date>;
  disabilities: FormControl<string>;
}
