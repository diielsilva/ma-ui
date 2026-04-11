import { Component, input, InputSignal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { appRoutes } from '../../routes/application-routes';

@Component({
  selector: 'app-header',
  imports: [MenubarModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected userSessionNavbarItems: MenuItem[] = [
    {
      label: 'Pedidos',
      icon: 'pi pi-ticket',
      items: [
        { label: 'Criar Pedido', routerLink: appRoutes.orders.create },
        { label: 'Meus Pedidos', routerLink: appRoutes.orders.list },
      ],
    },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      routerLink: appRoutes.login,
    },
  ];

  protected adminSessionNavbarItems: MenuItem[] = [
    {
      label: 'Pedidos',
      icon: 'pi pi-ticket',
      items: [
        { label: 'Criar Pedido', routerLink: appRoutes.orders.create },
        { label: 'Meus Pedidos', routerLink: appRoutes.orders.list },
        { label: 'Pesquisar Pedidos', routerLink: appRoutes.orders.search },
      ],
    },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      routerLink: appRoutes.login,
    },
  ];

  protected sessionlessNavbarItems: MenuItem[] = [
    { label: 'Entrar', icon: 'pi pi-sign-in', routerLink: appRoutes.login },
    { label: 'Cadastre-se', icon: 'pi pi-user-plus', routerLink: appRoutes.users.create },
  ];

  public hasSession: InputSignal<boolean> = input.required<boolean>();
  public isAnAdminSession: InputSignal<boolean> = input.required<boolean>();
}
