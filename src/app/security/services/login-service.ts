import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequestData } from '../dtos/login-request-data';
import { LoginResponseData } from '../dtos/login-response-data';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = `${environment.apiUrl}/login`;
  private httpClient = inject(HttpClient);

  public login(data: LoginRequestData) {
    return this.httpClient.post<LoginResponseData>(this.url, data);
  }
}
