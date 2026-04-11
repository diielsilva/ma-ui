import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private httpClient = inject(HttpClient);
  private url = `${environment.apiUrl}/enrollments`;

  create(orderId: number) {
    return this.httpClient.post<void>(`${this.url}/${orderId}/confirm/manual`, null);
  }
}
