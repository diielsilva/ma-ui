import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../types/order-status';

@Pipe({
  name: 'orderStatus',
})
export class OrderStatusPipe implements PipeTransform {
  transform(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.CANCELLED:
        return 'Cancelado';
      case OrderStatus.PENDING:
        return 'Aguardando Pagamento';
      case OrderStatus.CONFIRMED:
        return 'Confirmado';
      default:
        return 'Status Inválido';
    }
  }
}
