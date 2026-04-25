import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Page } from '../../shared/types/page';
import { Enrollment } from '../types/enrollment';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private httpClient = inject(HttpClient);
  private url = `${environment.apiUrl}/enrollments`;

  create(orderId: number) {
    return this.httpClient.post<void>(`${this.url}/${orderId}/confirm/manual`, null);
  }

  findAllBelongningToSessionOwner() {
    return this.httpClient.get<Enrollment[]>(this.url);
  }

  findAll(page: number) {
    return this.httpClient.get<Page<Enrollment>>(`${this.url}/all?page=${page - 1}`);
  }
}
