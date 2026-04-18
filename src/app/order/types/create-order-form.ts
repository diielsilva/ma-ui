import { FormControl } from '@angular/forms';

export interface CreateOrderForm {
  paymentMethod: FormControl<string>;
  value: FormControl<number>;
}
