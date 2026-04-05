import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { SessionService } from './security/services/session-service';
import { LoadingService } from './shared/services/loading-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, DialogModule, ProgressSpinnerModule, MenubarModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected loadingService = inject(LoadingService);
  protected sessionService = inject(SessionService);
  protected router = inject(Router);

  protected adminNavbarItems = signal<MenuItem[]>([
    { label: 'Pedidos', icon: 'pi pi-ticket', items: [] },
  ]);

  protected userNavbarItems = signal<MenuItem[]>([
    {
      label: 'Pedidos',
      icon: 'pi pi-ticket',
      items: [{ label: 'Registrar', routerLink: '/orders/register' }],
    },
  ]);

  protected defaultNavbarItems = signal<MenuItem[]>([
    { label: 'Entrar', icon: 'pi pi-sign-in', routerLink: '/users/login' },
    { label: 'Registre-se', icon: 'pi pi-user-plus', routerLink: '/users/register' },
  ]);
}
