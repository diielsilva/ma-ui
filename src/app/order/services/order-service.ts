import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateOrderRequestData } from '../types/create-order-request-data';
import { Order } from '../types/order';
import { PixDetail } from '../types/pix-detail';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private httpClient = inject(HttpClient);
  private url = `${environment.apiUrl}/orders`;

  create(data: CreateOrderRequestData) {
    return this.httpClient.post<void>(this.url, data);
  }

  findAllBelongningToTheSessionOwner() {
    return this.httpClient.get<Order[]>(this.url);
  }

  searchBy(userCpf: string) {
    return this.httpClient.get<Order[]>(`${this.url}/search?cpf=${userCpf}`);
  }

  findPixDetailBy(orderId: number) {
    return this.httpClient.get<PixDetail>(`${this.url}/${orderId}/details`);
  }
}
