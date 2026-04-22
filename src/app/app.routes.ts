import { Routes } from '@angular/router';
import { ListUserEnrollmentsPage } from './enrollment/pages/list-user-enrollments-page/list-user-enrollments-page';
import { CreateOrderPage } from './order/pages/create-order-page/create-order-page';
import { ListOrderPage } from './order/pages/list-order-page/list-order-page';
import { SearchOrderPage } from './order/pages/search-order-page/search-order-page';
import { adminSessionGuard } from './security/guards/admin-session-guard';
import { authorizationGuard } from './security/guards/authorization-guard';
import { sessionDestroyerGuard } from './security/guards/session-destroyer-guard';
import { LoginPage } from './security/pages/login-page/login-page';
import { CreateUserPage } from './user/pages/create-user-page/create-user-page';
import { UpdateUserPage } from './user/pages/update-user-page/update-user-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'security/login' },
  {
    path: 'users',
    children: [
      { path: 'create', component: CreateUserPage, canActivate: [sessionDestroyerGuard] },
      { path: 'update', component: UpdateUserPage, canActivate: [authorizationGuard] },
    ],
  },
  {
    path: 'orders',
    children: [
      { path: '', pathMatch: 'full', component: ListOrderPage },
      { path: 'create', component: CreateOrderPage },
      { path: 'search', component: SearchOrderPage, canActivate: [adminSessionGuard] },
    ],
    canActivate: [authorizationGuard],
  },
  {
    path: 'enrollments',
    children: [{ path: '', pathMatch: 'full', component: ListUserEnrollmentsPage }],
    canActivate: [authorizationGuard],
  },
  {
    path: 'security/login',
    component: LoginPage,
    canActivate: [sessionDestroyerGuard],
  },
];
