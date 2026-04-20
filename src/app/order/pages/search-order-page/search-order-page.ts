import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { take } from 'rxjs';
import { EnrollmentService } from '../../../enrollment/services/enrollment-service';
import { SessionService } from '../../../security/services/session-service';
import { FormFieldErrorMessage } from '../../../shared/components/form-field-error-message/form-field-error-message';
import { PageCard } from '../../../shared/components/page-card/page-card';
import { WarningMessage } from '../../../shared/components/warning-message/warning-message';
import { unsignedIntegerSequence } from '../../../user/validators/unsigned-integer-sequence';
import { OrderCard } from '../../components/order-card/order-card';
import { SEARCH_ORDER_FORM_ERRORS } from '../../constants/search-order-form-errors';
import { OrderCardMapper } from '../../mappers/order-card-mapper';
import { OrderService } from '../../services/order-service';
import { Order } from '../../types/order';
import { OrderCardData } from '../../types/order-card-data';
import { PaymentMethod } from '../../types/payment-method';
import { SearchOrderForm } from '../../types/search-order-form';
import { forbiddenCpf } from '../../validators/forbidden-cpf';
import { SearchOrderPageState } from './search-order-page-state';

@Component({
  selector: 'app-search-order-page',
  imports: [
    ButtonModule,
    DividerModule,
    FormFieldErrorMessage,
    IftaLabelModule,
    InputTextModule,
    OrderCard,
    PageCard,
    ReactiveFormsModule,
    WarningMessage,
  ],
  templateUrl: './search-order-page.html',
  styleUrl: './search-order-page.css',
})
export class SearchOrderPage implements OnInit {
  private formBuilder = inject(NonNullableFormBuilder);
  private orderService = inject(OrderService);
  private enrollmentService = inject(EnrollmentService);
  private sessionService = inject(SessionService);
  private messageService = inject(MessageService);
  private orderCardMapper = inject(OrderCardMapper);

  protected pageState = signal(SearchOrderPageState.INITIAL);
  protected manualOrderCards = signal<OrderCardData[]>([]);
  protected searchOrderForm!: FormGroup<SearchOrderForm>;
  protected searchOrderFormErrors = signal(SEARCH_ORDER_FORM_ERRORS);

  ngOnInit() {
    this.buildSearchOrderForm();
  }

  private buildSearchOrderForm() {
    const sessionOwnerCpf = this.sessionService.sessionOwnerIdentifier;

    this.searchOrderForm = this.formBuilder.group({
      cpf: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        unsignedIntegerSequence(),
        forbiddenCpf(sessionOwnerCpf),
      ]),
    });
  }

  protected searchManualOrders() {
    if (this.searchOrderForm.valid) {
      this.pageState.set(SearchOrderPageState.INITIAL);

      const cpf = this.searchOrderForm.controls.cpf.value;

      this.orderService
        .searchBy(cpf)
        .pipe(take(1))
        .subscribe({
          next: (response: Order[]) => {
            const manualOrders = response.filter(
              (order: Order) => order.paymentMethod === PaymentMethod.CASH,
            );

            const orderCards = this.orderCardMapper.mapAll(manualOrders);

            this.manualOrderCards.set(orderCards);

            this.pageState.set(SearchOrderPageState.LOADED);
          },
        });
    }
  }

  protected confirmManualEnrollment(orderId: number) {
    this.enrollmentService
      .create(orderId)
      .pipe(take(1))
      .subscribe({
        next: () => {
          const successMessage: ToastMessageOptions = {
            severity: 'success',
            summary: 'Inscrição confirmada com sucesso',
            sticky: true,
          };

          this.messageService.add(successMessage);
        },
      });
  }
}
