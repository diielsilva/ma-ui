import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateOrderRequestData } from '../dtos/create-order-request-data';
import { Order } from '../types/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = `${environment.apiUrl}/orders`;
  private httpClient = inject(HttpClient);

  public create(data: CreateOrderRequestData) {
    return this.httpClient.post<void>(this.url, data);
  }

  public findAll() {
    return this.httpClient.get<Order[]>(this.url);
  }
}
