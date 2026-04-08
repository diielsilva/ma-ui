import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
import { appRoutes } from '../../../shared/routes/application-routes';
import { UserService } from '../../services/user-service';
import { CreateUserForm } from '../../types/create-user-form';
import { CreateUserFormData } from '../../types/create-user-form-data';
import { Gender } from '../../types/gender';
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
  templateUrl: './create-user-page.html',
  styleUrl: './create-user-page.css',
})
export class CreateUserPage {
  protected form!: FormGroup<CreateUserForm>;
  protected genders: string[] = ['Masculino', 'Feminino'];
  private messageService: MessageService = inject(MessageService);
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);

  constructor() {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup<CreateUserForm>({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)],
        nonNullable: true,
      }),
      cpf: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          positiveIntegerSequence(),
        ],
        nonNullable: true,
      }),
      phone: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          positiveIntegerSequence(),
        ],
        nonNullable: true,
      }),
      gender: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      birthDate: new FormControl<Date | null>(null, { validators: [Validators.required] }),
      disabilities: new FormControl<string | null>(null),
    });
  }

  protected create(): void {
    const canSubmitForm: boolean = this.form.valid;

    if (canSubmitForm) {
      const gender: Gender =
        this.form.controls.gender.value === 'Masculino' ? Gender.MALE : Gender.FEMALE;

      const data: CreateUserFormData = {
        name: this.form.controls.name.value,
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        cpf: this.form.controls.cpf.value,
        phone: this.form.controls.phone.value,
        gender: gender,
        birthDate: this.form.controls.birthDate.value!,
        disabilities: this.form.controls.disabilities.value,
      };

      this.userService
        .create(data)
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
