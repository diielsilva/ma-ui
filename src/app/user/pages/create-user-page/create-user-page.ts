import { Component, inject, OnInit, signal } from '@angular/core';
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
import { ROUTES } from '../../../shared/routes/routes';
import { CREATE_USER_FORM_ERRORS } from '../../constants/create-user-form-errors';
import { UserService } from '../../services/user-service';
import { CreateUserForm } from '../../types/create-user-form';
import { CreateUserRequestData } from '../../types/create-user-request-data';
import { Gender } from '../../types/gender';
import { hasAgeToEnroll } from '../../validators/has-age-to-enroll';
import { unsignedIntegerSequence } from '../../validators/unsigned-integer-sequence';

@Component({
  selector: 'app-create-user-page',
  imports: [
    ButtonModule,
    DatePickerModule,
    FormFieldErrorMessage,
    IftaLabelModule,
    InputTextModule,
    PageContainer,
    ReactiveFormsModule,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './create-user-page.html',
  styleUrl: './create-user-page.css',
})
export class CreateUserPage implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(NonNullableFormBuilder);

  private messageService = inject(MessageService);
  private userService = inject(UserService);

  protected genders = ['Masculino', 'Feminino'];
  protected createUserForm!: FormGroup<CreateUserForm>;
  protected createUserFormErrors = signal(CREATE_USER_FORM_ERRORS);

  ngOnInit() {
    this.buildCreateUserForm();
  }

  private buildCreateUserForm() {
    this.createUserForm = this.formBuilder.group({
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
      birthDate: this.formBuilder.control(new Date(1970, 1, 1), [
        Validators.required,
        hasAgeToEnroll(),
      ]),
      disabilities: this.formBuilder.control(''),
    });
  }

  protected createUser() {
    if (this.createUserForm.valid) {
      const { name, email, password, cpf, phone, gender, birthDate, disabilities } =
        this.createUserForm.getRawValue();

      const request: CreateUserRequestData = {
        name: name,
        email: email,
        password: password,
        cpf: cpf,
        phone: phone,
        gender: gender === 'Masculino' ? Gender.MALE : Gender.FEMALE,
        birthDate: birthDate,
        disabilities: disabilities === '' ? null : disabilities,
      };

      this.userService
        .create(request)
        .pipe(take(1))
        .subscribe({
          next: () => {
            const successMessage: ToastMessageOptions = {
              severity: 'success',
              summary: 'Usuário registrado com sucesso',
              sticky: true,
            };

            this.messageService.add(successMessage);

            this.router.navigateByUrl(ROUTES.security.login);
          },
        });
    }
  }
}
