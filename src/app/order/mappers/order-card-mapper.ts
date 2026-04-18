import { inject, Injectable } from '@angular/core';
import { SessionService } from '../../security/services/session-service';
import { Order } from '../types/order';
import { OrderCardData } from '../types/order-card-data';
import { OrderStatus } from '../types/order-status';
import { PaymentMethod } from '../types/payment-method';

@Injectable({
  providedIn: 'root',
})
export class OrderCardMapper {
  private sessionService = inject(SessionService);

  map(order: Order) {
    if (order.paymentMethod === PaymentMethod.CASH) {
      const isBtnVisible =
        order.status === OrderStatus.PENDING &&
        order.dueDate.valueOf() > Date.now() &&
        this.sessionService.isAnAdminSession();

      const cardData: OrderCardData = {
        order: order,
        btnText: 'Confirmar',
        isBtnVisible: isBtnVisible,
      };

      return cardData;
    }

    const isBtnVisible =
      order.status === OrderStatus.PENDING && order.dueDate.valueOf() > Date.now();

    const cardData: OrderCardData = {
      order: order,
      btnText: 'Detalhes',
      isBtnVisible: isBtnVisible,
    };

    return cardData;
  }

  mapAll(orders: Order[]) {
    const cardsData: OrderCardData[] = [];

    orders.forEach((order: Order) => {
      const cardData = this.map(order);

      cardsData.push(cardData);
    });

    return cardsData;
  }
}
