import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IftaLabel } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { take } from 'rxjs';
import { FormFieldErrorMessage } from '../../../shared/components/form-field-error-message/form-field-error-message';
import { PageCard } from '../../../shared/components/page-card/page-card';
import { ROUTES } from '../../../shared/routes/routes';
import { LOGIN_FORM_ERRORS } from '../../constants/login-form-errors';
import { LoginRequestData } from '../../types/login-request-data';
import { LoginResponseData } from '../../types/login-response-data';
import { LoginService } from '../../services/login-service';
import { SessionService } from '../../services/session-service';
import { LoginForm } from '../../types/login-form';

@Component({
  selector: 'app-login-page',
  imports: [
    PageCard,
    ReactiveFormsModule,
    IftaLabel,
    InputTextModule,
    RouterModule,
    ButtonModule,
    FormFieldErrorMessage,
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(NonNullableFormBuilder);

  private loginService = inject(LoginService);
  private sessionService = inject(SessionService);

  protected loginForm!: FormGroup<LoginForm>;
  protected loginFormErrors = signal(LOGIN_FORM_ERRORS);

  ngOnInit() {
    this.buildLoginForm();
  }

  private buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
    });
  }

  protected login() {
    if (this.loginForm.valid) {
      const request: LoginRequestData = this.loginForm.getRawValue();

      this.loginService
        .login(request)
        .pipe(take(1))
        .subscribe({
          next: (response: LoginResponseData) => {
            this.sessionService.create(response);

            this.router.navigateByUrl(ROUTES.orders.create);
          },
        });
    }
  }
}
