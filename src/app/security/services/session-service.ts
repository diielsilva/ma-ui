import { computed, Injectable, signal } from '@angular/core';
import { Role } from '../../user/types/role';
import { LoginResponseData } from '../types/login-response-data';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private userSession = signal<LoginResponseData | undefined>(undefined);

  hasAnOnlineUser = computed(() => this.userSession() !== undefined);

  isAnAdminSession = computed(
    () => this.hasAnOnlineUser() && this.userSession()?.role === Role.ADMIN,
  );

  create(data: LoginResponseData) {
    this.userSession.set(data);
  }

  destroy() {
    this.userSession.set(undefined);
  }

  getSessionToken() {
    if (!this.hasAnOnlineUser()) {
      throw new Error('Não há usuários online');
    }

    return this.userSession()!.token;
  }

  getSessionOwnerCpf() {
    if (!this.hasAnOnlineUser()) {
      throw new Error('Não há usuários online');
    }

    return this.userSession()!.cpf;
  }
}
