import { Pipe, PipeTransform } from '@angular/core';
import { PaymentMethod } from '../types/payment-method';

@Pipe({
  name: 'paymentMethod',
})
export class PaymentMethodPipe implements PipeTransform {
  transform(paymentMethod: PaymentMethod): string {
    switch (paymentMethod) {
      case PaymentMethod.PIX:
        return 'Pix';
      case PaymentMethod.CASH:
        return 'Dinheiro';
      default:
        return 'Método de Pagamento Inválido';
    }
  }
}
