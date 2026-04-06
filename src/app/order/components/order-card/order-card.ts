import { DatePipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { OrderCardData } from '../../types/order-card-data';
import { OrderStatusPipe } from '../../pipes/order-status-pipe';
import { PaymentMethodPipe } from '../../pipes/payment-method-pipe';

@Component({
  selector: 'app-order-card',
  imports: [ButtonModule, PanelModule, DatePipe, PaymentMethodPipe, OrderStatusPipe, NgClass],
  templateUrl: './order-card.html',
  styleUrl: './order-card.css',
})
export class OrderCard {
  data = input.required<OrderCardData>();
}
