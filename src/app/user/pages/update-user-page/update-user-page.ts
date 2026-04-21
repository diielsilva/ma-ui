import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { IftaLabel } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { take } from 'rxjs';
import { SessionService } from '../../../security/services/session-service';
import { FormFieldErrorMessage } from '../../../shared/components/form-field-error-message/form-field-error-message';
import { PageCard } from '../../../shared/components/page-card/page-card';
import { UPDATE_USER_FORM_ERRORS } from '../../constants/update-user-form-errors';
import { UserService } from '../../services/user-service';
import { Gender } from '../../types/gender';
import { Role } from '../../types/role';
import { UpdateUserForm } from '../../types/update-user-form';
import { UpdateUserRequestData } from '../../types/update-user-request-data';
import { User } from '../../types/user';
import { hasAgeToEnroll } from '../../validators/has-age-to-enroll';
import { nullableMinLength } from '../../validators/nullable-min-length';
import { unsignedIntegerSequence } from '../../validators/unsigned-integer-sequence';

@Component({
  selector: 'app-update-user-page',
  imports: [
    ButtonModule,
    DatePickerModule,
    FormFieldErrorMessage,
    IftaLabel,
    InputTextModule,
    PageCard,
    ReactiveFormsModule,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './update-user-page.html',
  styleUrl: './update-user-page.css',
})
export class UpdateUserPage implements OnInit {
  private formBuilder = inject(NonNullableFormBuilder);
  private sessionService = inject(SessionService);
  private userService = inject(UserService);
  private messageService = inject(MessageService);

  protected genders = ['Masculino', 'Feminino'];
  protected updateUserForm!: FormGroup<UpdateUserForm>;
  protected updateUserFormErrors = signal(UPDATE_USER_FORM_ERRORS);

  ngOnInit() {
    this.buildUpdateUserForm();
  }

  private buildUpdateUserForm() {
    const sessionOwner = this.sessionService.getSessionOwner();
    const gender = sessionOwner.gender === Gender.MALE ? this.genders[0] : this.genders[1];
    const disabilities = sessionOwner.disabilities === undefined ? '' : sessionOwner.disabilities!;

    this.updateUserForm = this.formBuilder.group({
      name: this.formBuilder.control(sessionOwner.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: this.formBuilder.control(sessionOwner.email, [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [nullableMinLength(5)]),
      cpf: this.formBuilder.control(sessionOwner.cpf, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        unsignedIntegerSequence(),
      ]),
      phone: this.formBuilder.control(sessionOwner.phone, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        unsignedIntegerSequence(),
      ]),
      gender: this.formBuilder.control(gender, [Validators.required]),
      birthDate: this.formBuilder.control(new Date(sessionOwner.birthDate), [
        Validators.required,
        hasAgeToEnroll(),
      ]),
      disabilities: this.formBuilder.control(disabilities),
    });
  }

  protected updateUser() {
    if (this.updateUserForm.valid) {
      const { name, email, password, cpf, phone, gender, birthDate, disabilities } =
        this.updateUserForm.getRawValue();

      const request: UpdateUserRequestData = {
        name: name,
        email: email,
        password: password === '' ? null : password,
        cpf: cpf,
        phone: phone,
        gender: gender === 'Masculino' ? Gender.MALE : Gender.FEMALE,
        birthDate: birthDate,
        disabilities: disabilities === '' ? null : disabilities,
      };

      this.userService
        .update(request)
        .pipe(take(1))
        .subscribe({
          next: () => {
            const successMessage: ToastMessageOptions = {
              severity: 'success',
              summary: 'Seu perfil foi atualizado com sucesso',
              sticky: true,
            };

            const updatedSessionOwner: User = {
              name: name,
              email: email,
              cpf: cpf,
              phone: phone,
              gender: gender === 'Masculino' ? Gender.MALE : Gender.FEMALE,
              birthDate: birthDate,
              role: Role.USER,
              disabilities: disabilities === '' ? undefined : disabilities,
            };

            this.sessionService.updateSessionOwnerData(updatedSessionOwner);

            this.messageService.add(successMessage);
          },
        });
    }
  }
}
