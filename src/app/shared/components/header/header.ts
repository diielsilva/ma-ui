import { Component, input, InputSignal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ROUTES } from '../../routes/routes';

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
        { label: 'Criar Pedido', routerLink: ROUTES.orders.create },
        { label: 'Meus Pedidos', routerLink: ROUTES.orders.list },
      ],
    },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      routerLink: ROUTES.login,
    },
  ];

  protected adminSessionNavbarItems: MenuItem[] = [
    {
      label: 'Pedidos',
      icon: 'pi pi-ticket',
      items: [
        { label: 'Criar Pedido', routerLink: ROUTES.orders.create },
        { label: 'Meus Pedidos', routerLink: ROUTES.orders.list },
        { label: 'Pesquisar Pedidos', routerLink: ROUTES.orders.search },
      ],
    },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      routerLink: ROUTES.login,
    },
  ];

  protected sessionlessNavbarItems: MenuItem[] = [
    { label: 'Entrar', icon: 'pi pi-sign-in', routerLink: ROUTES.login },
    { label: 'Cadastre-se', icon: 'pi pi-user-plus', routerLink: ROUTES.users.create },
  ];

  public hasSession: InputSignal<boolean> = input.required<boolean>();
  public isAnAdminSession: InputSignal<boolean> = input.required<boolean>();
}
