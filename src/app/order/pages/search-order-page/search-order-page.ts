import { Component, inject, signal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { take } from 'rxjs';
import { EnrollmentService } from '../../../enrollment/services/enrollment-service';
import { FormFieldErrorMessage } from '../../../shared/components/form-field-error-message/form-field-error-message';
import { PageCard } from '../../../shared/components/page-card/page-card';
import { unsignedIntegerSequence } from '../../../user/validators/unsigned-integer-sequence';
import { OrderCard } from '../../components/order-card/order-card';
import { searchOrderFormErrors } from '../../constants/search-order-form-errors';
import { OrderService } from '../../services/order-service';
import { Order } from '../../types/order';
import { OrderCardData } from '../../types/order-card-data';
import { OrderStatus } from '../../types/order-status';
import { PaymentMethod } from '../../types/payment-method';
import { SearchOrderForm } from '../../types/search-order-form';
import { SearchOrderPageState } from './search-order-page-state';

@Component({
  selector: 'app-search-order-page',
  imports: [
    PageCard,
    ButtonModule,
    InputTextModule,
    FormFieldErrorMessage,
    ReactiveFormsModule,
    IftaLabelModule,
    DividerModule,
    OrderCard,
    MessageModule,
  ],
  templateUrl: './search-order-page.html',
  styleUrl: './search-order-page.css',
})
export class SearchByUserCpfPage {
  private formBuilder = inject(NonNullableFormBuilder);
  private orderService = inject(OrderService);
  private enrollmentService = inject(EnrollmentService);
  private messageService = inject(MessageService);

  protected state = signal(SearchOrderPageState.INITIAL);
  protected cards = signal<OrderCardData[]>([]);

  protected form: FormGroup<SearchOrderForm> = this.formBuilder.group({
    cpf: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      unsignedIntegerSequence(),
    ]),
  });

  protected formErrors = signal(searchOrderFormErrors);

  protected search() {
    if (this.form.valid) {
      const cpf = this.form.controls.cpf.value;

      this.orderService
        .search(cpf)
        .pipe(take(1))
        .subscribe({
          next: (response: Order[]) => this.displayCards(response),
        });
    }
  }

  protected displayCards(orders: Order[]) {
    this.cards.set([]);

    for (const order of orders) {
      const isAutomated = order.paymentMethod === PaymentMethod.PIX;

      if (isAutomated) {
        const data: OrderCardData = {
          order: order,
          btnText: 'Detalhes',
          isBtnVisible: true,
        };

        this.cards().push(data);
      } else {
        const data: OrderCardData = {
          order: order,
          btnText: 'Confirmar',
          isBtnVisible:
            order.dueDate.valueOf() < Date.now() || order.status !== OrderStatus.PENDING,
        };

        this.cards().push(data);
      }
    }

    this.state.set(SearchOrderPageState.LOADED);
  }

  protected confirmOrder(id: number) {
    this.enrollmentService
      .create(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          const toast: ToastMessageOptions = {
            severity: 'success',
            summary: 'Pedido de inscrição confirmado com sucesso',
            sticky: true,
          };

          this.messageService.add(toast);
        },
      });
  }
}
