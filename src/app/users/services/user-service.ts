import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateUserRequestData } from '../dtos/create-user-request-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.apiUrl}/users`;
  private httpClient = inject(HttpClient);

  public save(data: CreateUserRequestData) {
    return this.httpClient.post<void>(this.url, data);
  }
}
