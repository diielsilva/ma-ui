import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IftaLabel } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { take } from 'rxjs';
import { FormErrorMessage } from '../../../shared/components/form-error-message/form-error-message';
import { PageContainer } from '../../../shared/components/page-container/page-container';
import { LoginRequestData } from '../../dtos/login-request-data';
import { LoginResponseData } from '../../dtos/login-response-data';
import { LoginService } from '../../services/login-service';
import { SessionService } from '../../services/session-service';

@Component({
  selector: 'app-login-page',
  imports: [
    PageContainer,
    ReactiveFormsModule,
    IftaLabel,
    InputTextModule,
    RouterModule,
    ButtonModule,
    FormErrorMessage,
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  protected form!: FormGroup;
  private loginService = inject(LoginService);
  private sessionService = inject(SessionService);
  private router = inject(Router);

  constructor() {
    this.form = new FormGroup({
      email: new FormControl<string>('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(5)],
      }),
    });
  }

  protected onSubmit() {
    if (this.form.valid) {
      const request: LoginRequestData = {
        email: this.form.get('email')!.value,
        password: this.form.get('password')!.value,
      };

      this.loginService
        .login(request)
        .pipe(take(1))
        .subscribe({
          next: (response: LoginResponseData) => {
            this.sessionService.create(response);

            this.router.navigateByUrl('/orders/register');
          },
        });
    }
  }
}
