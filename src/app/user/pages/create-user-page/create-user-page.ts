import { Component, inject, signal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { take } from 'rxjs';
import { FormFieldErrorMessage } from '../../../shared/components/form-field-error-message/form-field-error-message';
import { PageContainer } from '../../../shared/components/page-container/page-container';
import { appRoutes } from '../../../shared/routes/application-routes';
import { userCreationFormErrors } from '../../constants/user-creation-form-errors';
import { UserService } from '../../services/user-service';
import { CreateUserRequestData } from '../../types/create-user-request-data';
import { Gender } from '../../types/gender';
import { UserCreationFormData } from '../../types/user-creation-form-data';
import { unsignedIntegerSequence } from '../../validators/unsigned-integer-sequence';

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
    FormFieldErrorMessage,
    IftaLabelModule,
  ],
  templateUrl: './create-user-page.html',
  styleUrl: './create-user-page.css',
})
export class CreateUserPage {
  private messageService = inject(MessageService);
  private userService = inject(UserService);
  private router = inject(Router);
  private formBuilder = inject(NonNullableFormBuilder);

  protected genders = ['Masculino', 'Feminino'];
  protected formErrors = signal(userCreationFormErrors);

  protected form: FormGroup<UserCreationFormData> = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
    cpf: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      unsignedIntegerSequence(),
    ]),
    phone: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      unsignedIntegerSequence(),
    ]),
    gender: this.formBuilder.control('', [Validators.required]),
    birthDate: this.formBuilder.control(new Date(1970, 1, 1), [Validators.required]),
    disabilities: this.formBuilder.control(''),
  });

  protected create(): void {
    if (this.form.valid) {
      const controls = this.form.controls;

      const request: CreateUserRequestData = {
        name: controls.name.value,
        email: controls.email.value,
        password: controls.password.value,
        cpf: controls.cpf.value,
        phone: controls.phone.value,
        gender: controls.gender.value === 'Masculino' ? Gender.MALE : Gender.FEMALE,
        birthDate: controls.birthDate.value!,
        disabilities: controls.disabilities.value === '' ? null : controls.disabilities.value,
      };

      this.userService
        .create(request)
        .pipe(take(1))
        .subscribe({
          next: () => {
            const toast: ToastMessageOptions = {
              severity: 'success',
              detail: 'Usuário registrado com sucesso',
              sticky: true,
            };

            this.messageService.add(toast);

            this.router.navigateByUrl(appRoutes.login);
          },
        });
    }
  }
}
