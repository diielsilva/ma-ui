import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { take } from 'rxjs';
import { PageCard } from '../../../shared/components/page-card/page-card';
import { OrderCard } from '../../components/order-card/order-card';
import { OrderCardMapper } from '../../mappers/order-card-mapper';
import { OrderService } from '../../services/order-service';
import { Order } from '../../types/order';
import { OrderCardData } from '../../types/order-card-data';
import { PaymentMethod } from '../../types/payment-method';
import { PixDetail } from '../../types/pix-detail';
import { ListOrderPageState } from './list-order-page-state';

@Component({
  selector: 'app-list-session-owner-order-page',
  imports: [PageCard, OrderCard, DialogModule, ClipboardModule, ButtonModule],
  templateUrl: './list-order-page.html',
  styleUrl: './list-order-page.css',
})
export class ListOrderPage implements OnInit {
  private orderService = inject(OrderService);
  private orderCardMapper = inject(OrderCardMapper);

  protected orders = signal<OrderCardData[]>([]);
  protected state = signal<ListOrderPageState>(ListOrderPageState.INITIAL);
  protected pixDetail = signal<PixDetail | undefined>(undefined);
  protected shouldDisplayPixDetailModal = computed(() => this.pixDetail() !== undefined);

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

          const orderCards = this.orderCardMapper.mapAll(orders);

          this.orders.set(orderCards);
        },
      });
  }

  protected handleOrderCardClick(orderId: number) {
    for (const card of this.orders()) {
      if (card.order.id === orderId) {
        if (card.order.paymentMethod === PaymentMethod.PIX) {
          this.getPixDetailBy(orderId);
        } else {
          //TODO code to confirm order, when an admin is online
        }

        break;
      }
    }
  }

  protected getPixDetailBy(orderId: number) {
    this.orderService
      .getPixDetailByOrderId(orderId)
      .pipe(take(1))
      .subscribe({ next: (response: PixDetail) => this.pixDetail.set(response) });
  }

  protected hidePixDetail() {
    this.pixDetail.set(undefined);
  }
}
