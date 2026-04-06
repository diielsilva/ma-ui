import { Component, inject, OnInit, signal } from '@angular/core';
import { take } from 'rxjs';
import { PageContainer } from '../../../shared/components/page-container/page-container';
import { OrderCard } from '../../components/order-card/order-card';
import { Order } from '../../types/order';
import { OrderCardData } from '../../types/order-card-data';
import { OrderService } from '../../services/order-service';
import { ListOrderPageState } from './list-order-page-state';
import { SessionService } from '../../../security/services/session-service';

@Component({
  selector: 'app-list-session-owner-order-page',
  imports: [PageContainer, OrderCard],
  templateUrl: './list-order-page.html',
  styleUrl: './list-order-page.css',
})
export class ListOrderPage implements OnInit {
  protected orders = signal<OrderCardData[]>([]);
  protected state = signal<ListOrderPageState>(ListOrderPageState.INITIAL);
  private orderService = inject(OrderService);
  private sessionService = inject(SessionService);

  public ngOnInit() {
    this.findAll();
  }

  protected findAll() {
    this.orderService
      .findAll()
      .pipe(take(1))
      .subscribe({
        next: (orders: Order[]) => {
          this.state.set(ListOrderPageState.LOADED);

          for (const order of orders) {
            if (order.paymentMethod === 'CASH') {
              const btnText = 'Confirmar';

              const isBtnDisabled =
                order.status !== 'PENDING' ||
                order.dueDate.valueOf() < Date.now().valueOf() ||
                !this.sessionService.isAnAdminSession();

              const cardData: OrderCardData = { order, btnText, isBtnDisabled };

              this.orders().push(cardData);
            } else {
              const btnText = 'Detalhes';

              const isBtnDisabled =
                order.status !== 'PENDING' || order.dueDate.valueOf() < Date.now().valueOf();

              const cardData: OrderCardData = { order, btnText, isBtnDisabled };

              this.orders().push(cardData);
            }
          }
        },
      });
  }
}
