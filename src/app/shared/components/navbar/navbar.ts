import { Component, input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ROUTES } from '../../routes/routes';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  hasSession = input.required<boolean>();
  isAnAdminSession = input.required<boolean>();

  protected adminNavbar: MenuItem[] = [];
  protected commonUserNavbar: MenuItem[] = [];
  protected guestNavbar: MenuItem[] = [];

  ngOnInit() {
    this.buildAdminNavbar();
    this.buildCommonUserNavbar();
    this.buildGuestNavbar();
  }

  private buildAdminNavbar() {
    this.adminNavbar = [
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
        label: 'Inscrições',
        icon: 'pi pi-flag',
        items: [{ label: 'Meus Pedidos', routerLink: ROUTES.enrollments.list }],
      },
      { label: 'Perfil', icon: 'pi pi-user', routerLink: ROUTES.users.update },
      { label: 'Sair', icon: 'pi pi-sign-out', routerLink: ROUTES.security.login },
    ];
  }

  private buildCommonUserNavbar() {
    this.commonUserNavbar = [
      {
        label: 'Pedidos',
        icon: 'pi pi-ticket',
        items: [
          { label: 'Criar Pedido', routerLink: ROUTES.orders.create },
          { label: 'Meus Pedidos', routerLink: ROUTES.orders.list },
        ],
      },
      {
        label: 'Inscrições',
        icon: 'pi pi-flag',
        items: [{ label: 'Meus Pedidos', routerLink: ROUTES.enrollments.list }],
      },
      { label: 'Perfil', icon: 'pi pi-user', routerLink: ROUTES.users.update },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        routerLink: ROUTES.security.login,
      },
    ];
  }

  private buildGuestNavbar() {
    this.guestNavbar = [
      { label: 'Entrar', icon: 'pi pi-sign-in', routerLink: ROUTES.security.login },
      { label: 'Cadastre-se', icon: 'pi pi-user-plus', routerLink: ROUTES.users.create },
    ];
  }
}
