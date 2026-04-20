import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IftaLabel } from 'primeng/iftalabel';
import { SelectModule } from 'primeng/select';
import { take } from 'rxjs';
import { FormFieldErrorMessage } from '../../../shared/components/form-field-error-message/form-field-error-message';
import { PageCard } from '../../../shared/components/page-card/page-card';
import { CREATE_ORDER_FORM_ERRORS } from '../../constants/create-order-form-errors';
import { CreateOrderRequestData } from '../../types/create-order-request-data';
import { OrderService } from '../../services/order-service';
import { CreateOrderForm } from '../../types/create-order-form';
import { PaymentMethod } from '../../types/payment-method';

@Component({
  selector: 'app-create-order-page',
  imports: [
    ButtonModule,
    FormFieldErrorMessage,
    IftaLabel,
    PageCard,
    ReactiveFormsModule,
    SelectModule,
  ],
  templateUrl: './create-order-page.html',
  styleUrl: './create-order-page.css',
})
export class CreateOrderPage implements OnInit {
  private formBuilder = inject(NonNullableFormBuilder);
  private orderService = inject(OrderService);
  private messageService = inject(MessageService);

  protected paymentMethods = ['Dinheiro', 'Pix'];
  protected orderValues = [10, 15, 20, 25, 30, 35, 40];
  protected createOrderForm!: FormGroup<CreateOrderForm>;
  protected createOrderFormErrors = signal(CREATE_ORDER_FORM_ERRORS);

  ngOnInit() {
    this.buildCreateOrderForm();
  }

  private buildCreateOrderForm() {
    this.createOrderForm = this.formBuilder.group({
      paymentMethod: this.formBuilder.control('', [Validators.required]),
      value: this.formBuilder.control(30, [
        Validators.required,
        Validators.min(10),
        Validators.max(40),
      ]),
    });
  }

  protected createOrder() {
    if (this.createOrderForm.valid) {
      const { paymentMethod, value } = this.createOrderForm.getRawValue();

      const request: CreateOrderRequestData = {
        paymentMethod: paymentMethod === 'Dinheiro' ? PaymentMethod.CASH : PaymentMethod.PIX,
        value: value,
      };

      this.orderService
        .create(request)
        .pipe(take(1))
        .subscribe({
          next: () => {
            const successMessage: ToastMessageOptions = {
              severity: 'success',
              sticky: true,
              summary: 'Pedido de inscrição realizado com sucesso',
            };

            this.messageService.add(successMessage);
          },
        });
    }
  }
}
