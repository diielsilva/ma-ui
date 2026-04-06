import { OrderStatus } from './order-status';
import { PaymentMethod } from './payment-method';

export interface Order {
  id: number;
  value: number;
  dueDate: Date;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: Date;
}
