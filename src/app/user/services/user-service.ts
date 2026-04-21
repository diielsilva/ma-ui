import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateUserRequestData } from '../types/create-user-request-data';
import { UpdateUserRequestData } from '../types/update-user-request-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  private url = `${environment.apiUrl}/users`;

  create(data: CreateUserRequestData) {
    return this.httpClient.post<void>(this.url, data);
  }

  update(data: UpdateUserRequestData) {
    return this.httpClient.patch<void>(this.url, data);
  }
}
