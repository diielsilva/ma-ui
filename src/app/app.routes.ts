import { Routes } from '@angular/router';
import { sessionDestroyerGuard } from './security/guards/session-destroyer-guard';
import { LoginPage } from './security/pages/login-page/login-page';
import { RegisterUserPage } from './user/pages/register-user-page/register-user-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users/login' },
  {
    path: 'users',
    children: [
      { path: 'register', component: RegisterUserPage, canActivate: [sessionDestroyerGuard] },
      { path: 'login', component: LoginPage, canActivate: [sessionDestroyerGuard] },
    ],
  },
];
