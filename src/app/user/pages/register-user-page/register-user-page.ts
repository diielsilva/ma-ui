import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { take } from 'rxjs';
import { FormErrorMessage } from '../../../shared/components/form-error-message/form-error-message';
import { PageContainer } from '../../../shared/components/page-container/page-container';
import { CreateUserRequestData } from '../../dtos/create-user-request-data';
import { UserService } from '../../services/user-service';
import { positiveIntegerSequence } from '../../validators/positive-integer-sequence';

@Component({
  selector: 'app-register-user-page',
  imports: [
    PageContainer,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    TextareaModule,
    ButtonModule,
    FormErrorMessage,
    IftaLabelModule,
  ],
  templateUrl: './register-user-page.html',
  styleUrl: './register-user-page.css',
})
export class RegisterUserPage {
  protected form: FormGroup;
  protected genders = ['Masculino', 'Feminino'];
  private messageService = inject(MessageService);
  private userService = inject(UserService);

  constructor() {
    this.form = new FormGroup({
      name: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      email: new FormControl<string>('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      cpf: new FormControl<string>('', {
        validators: [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          positiveIntegerSequence(),
        ],
      }),
      phone: new FormControl<string>('', {
        validators: [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          positiveIntegerSequence(),
        ],
      }),
      gender: new FormControl<string | undefined>(undefined, { validators: [Validators.required] }),
      birthDate: new FormControl<Date | undefined>(undefined, {
        validators: [Validators.required],
      }),
      disabilities: new FormControl<string | undefined>(undefined),
    });
  }

  protected onSubmit() {
    const shouldSubmitForm = this.form.valid;

    if (shouldSubmitForm) {
      const gender = this.form.get('gender')!.value === 'Masculino' ? 'MALE' : 'FEMALE';

      const data: CreateUserRequestData = {
        name: this.form.get('name')!.value,
        email: this.form.get('email')!.value,
        password: this.form.get('password')!.value,
        cpf: this.form.get('cpf')!.value,
        phone: this.form.get('phone')!.value,
        gender,
        birthDate: this.form.get('birthDate')!.value,
        disabilities: this.form.get('disabilities')!.value,
      };

      this.userService
        .save(data)
        .pipe(take(1))
        .subscribe({
          next: () => {
            const toast: ToastMessageOptions = {
              severity: 'success',
              detail: 'Usuário registrado com sucesso',
              sticky: true,
            };

            this.messageService.add(toast);
          },
        });
    }
  }
}
