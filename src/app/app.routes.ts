import { Routes } from '@angular/router';
import { ListOrderPage } from './order/pages/list-order-page/list-order-page';
import { RegisterOrderPage } from './order/pages/register-order-page/register-order-page';
import { authorizationGuard } from './security/guards/authorization-guard';
import { sessionDestroyerGuard } from './security/guards/session-destroyer-guard';
import { LoginPage } from './security/pages/login-page/login-page';
import { CreateUserPage } from './user/pages/create-user-page/create-user-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'security/login' },
  {
    path: 'users',
    children: [
      {
        path: 'create',
        component: CreateUserPage,
        canActivate: [sessionDestroyerGuard],
      },
    ],
  },
  {
    path: 'orders',
    children: [
      { path: '', pathMatch: 'full', component: ListOrderPage },
      { path: 'register', component: RegisterOrderPage },
    ],
    canActivate: [authorizationGuard],
  },
  {
    path: 'security/login',
    component: LoginPage,
    canActivate: [sessionDestroyerGuard],
  },
];
