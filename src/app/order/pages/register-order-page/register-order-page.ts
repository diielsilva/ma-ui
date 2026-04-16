import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IftaLabel } from 'primeng/iftalabel';
import { SelectModule } from 'primeng/select';
import { take } from 'rxjs';
import { FormErrorMessage } from '../../../shared/components/form-error-message/form-error-message';
import { PageCard } from '../../../shared/components/page-card/page-card';
import { CreateOrderRequestData } from '../../dtos/create-order-request-data';
import { OrderService } from '../../services/order-service';

@Component({
  selector: 'app-register-order-page',
  imports: [
    PageCard,
    SelectModule,
    ReactiveFormsModule,
    IftaLabel,
    ButtonModule,
    FormErrorMessage,
  ],
  templateUrl: './register-order-page.html',
  styleUrl: './register-order-page.css',
})
export class RegisterOrderPage {
  protected paymentMethods = ['Dinheiro', 'Pix'];
  protected orderValues = [10, 15, 20, 25, 30, 35, 40];
  protected form!: FormGroup;

  private orderService = inject(OrderService);
  private messageService = inject(MessageService);

  constructor() {
    this.form = new FormGroup({
      paymentMethod: new FormControl<string>('', { validators: Validators.required }),
      value: new FormControl<number | undefined>(undefined, { validators: Validators.required }),
    });
  }

  protected create() {
    if (this.form.valid) {
      const paymentMethod = this.form.get('paymentMethod')!.value === 'Dinheiro' ? 'CASH' : 'PIX';
      const data: CreateOrderRequestData = { value: this.form.get('value')!.value, paymentMethod };

      this.orderService
        .create(data)
        .pipe(take(1))
        .subscribe({
          next: () => {
            const toast: ToastMessageOptions = {
              severity: 'success',
              sticky: true,
              summary: 'Pedido de inscrição realizado com sucesso',
            };

            this.messageService.add(toast);
          },
        });
    }
  }
}
