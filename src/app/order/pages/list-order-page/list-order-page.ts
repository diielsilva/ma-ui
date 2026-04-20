import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { take } from 'rxjs';
import { EnrollmentService } from '../../../enrollment/services/enrollment-service';
import { PageCard } from '../../../shared/components/page-card/page-card';
import { RefreshPageButton } from '../../../shared/components/refresh-page-button/refresh-page-button';
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
  imports: [ClipboardModule, DialogModule, MessageModule, OrderCard, PageCard, RefreshPageButton],
  templateUrl: './list-order-page.html',
  styleUrl: './list-order-page.css',
})
export class ListOrderPage implements OnInit {
  private orderService = inject(OrderService);
  private enrollmentService = inject(EnrollmentService);
  private messageService = inject(MessageService);
  private orderCardMapper = inject(OrderCardMapper);

  protected orderCards = signal<OrderCardData[]>([]);
  protected pageState = signal(ListOrderPageState.INITIAL);
  protected pixDetail = signal<PixDetail | undefined>(undefined);
  protected isPixDetailVisible = computed(() => this.pixDetail() !== undefined);
  protected copyPixCodeToClipboardBtnText = signal('Copiar Código');

  ngOnInit() {
    this.findAllOrdersOfTheSessionOwner();
  }

  protected findAllOrdersOfTheSessionOwner() {
    this.orderService
      .findAllBelongningToTheSessionOwner()
      .pipe(take(1))
      .subscribe({
        next: (orders: Order[]) => {
          this.pageState.set(ListOrderPageState.LOADED);

          const orderCards = this.orderCardMapper.mapAll(orders);

          this.orderCards.set(orderCards);
        },
      });
  }

  protected handleOrderCardClick(orderId: number) {
    const selectedCards = this.orderCards().filter((orderCard) => orderCard.order.id === orderId);
    const wasOrderFound = selectedCards.length === 1;

    if (wasOrderFound) {
      const order = selectedCards[0].order;

      if (order.paymentMethod === PaymentMethod.PIX) {
        this.displayPixDetail(orderId);
      } else {
        this.confirmManualEnrollment(orderId);
      }
    }
  }

  private confirmManualEnrollment(orderId: number) {
    this.enrollmentService
      .create(orderId)
      .pipe(take(1))
      .subscribe({
        next: () => {
          const successMessage: ToastMessageOptions = {
            severity: 'success',
            summary: 'Inscrição realizada com sucesso',
            sticky: true,
          };

          this.messageService.add(successMessage);

          this.findAllOrdersOfTheSessionOwner();
        },
      });
  }

  protected displayPixDetail(orderId: number) {
    this.orderService
      .findPixDetailBy(orderId)
      .pipe(take(1))
      .subscribe({ next: (response: PixDetail) => this.pixDetail.set(response) });
  }

  protected warnUserThatPixCodeWasCopiedToClipboard() {
    this.copyPixCodeToClipboardBtnText.set('Copiado');
  }

  protected hidePixDetail() {
    this.pixDetail.set(undefined);
    this.copyPixCodeToClipboardBtnText.set('Copiar Código');
  }
}
