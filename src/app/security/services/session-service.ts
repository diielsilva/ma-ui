import { computed, Injectable, signal } from '@angular/core';
import { LoginResponseData } from '../dtos/login-response-data';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private session = signal<LoginResponseData | undefined>(undefined);
  private hasActive = computed(() => this.session() !== undefined);
  private belongsToAnAdmin = computed(() => this.hasActive() && this.session()?.role === 'ADMIN');

  public create(data: LoginResponseData) {
    this.session.set(data);
  }

  public get hasSession() {
    return this.hasActive;
  }

  public get isAnAdminSession() {
    return this.belongsToAnAdmin;
  }

  public get sessionToken() {
    if (this.hasSession()) {
      return this.session()!.token;
    }

    return '';
  }

  public destroy() {
    this.session.set(undefined);
  }
}
