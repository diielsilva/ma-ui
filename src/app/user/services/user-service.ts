import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateUserRequestData } from '../types/create-user-request-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.apiUrl}/users`;
  private httpClient = inject(HttpClient);

  public create(data: CreateUserRequestData): Observable<void> {
    return this.httpClient.post<void>(this.url, data);
  }
}
