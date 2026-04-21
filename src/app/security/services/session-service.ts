import { computed, Injectable, signal } from '@angular/core';
import { Role } from '../../user/types/role';
import { User } from '../../user/types/user';
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

  getSessionOwner() {
    if (!this.hasAnOnlineUser()) {
      throw new Error('Não há usuários online');
    }

    const { name, email, cpf, phone, gender, role, birthDate, disabilities } = this.userSession()!;

    const sessionOwner: User = {
      name: name,
      email: email,
      cpf: cpf,
      phone: phone,
      gender: gender,
      role: role,
      birthDate: birthDate,
      disabilities: disabilities,
    };

    return sessionOwner;
  }

  updateSessionOwnerData(sessionOwner: User) {
    if (!this.hasAnOnlineUser()) {
      throw new Error('Não há usuários online');
    }

    const { name, email, cpf, phone, gender, birthDate, disabilities } = sessionOwner;

    this.userSession()!.name = name;
    this.userSession()!.email = email;
    this.userSession()!.cpf = cpf;
    this.userSession()!.phone = phone;
    this.userSession()!.gender = gender;
    this.userSession()!.birthDate = birthDate;
    this.userSession()!.disabilities = disabilities === undefined ? '' : disabilities;
  }
}
