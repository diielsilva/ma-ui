import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { OrderStatusPipe } from '../../pipes/order-status-pipe';
import { PaymentMethodPipe } from '../../pipes/payment-method-pipe';
import { OrderCardData } from '../../types/order-card-data';

@Component({
  selector: 'app-order-card',
  imports: [ButtonModule, PanelModule, DatePipe, PaymentMethodPipe, OrderStatusPipe],
  templateUrl: './order-card.html',
  styleUrl: './order-card.css',
})
export class OrderCard {
  cardData = input.required<OrderCardData>();
  onBtnClick = output<number>();
}
