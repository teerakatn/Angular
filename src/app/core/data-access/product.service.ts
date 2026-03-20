import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/products`;
  private readonly getApiUrl = `${this.apiUrl}?limit=10&skip=10&select=id,title,price,category`;
  private readonly postApiUrl = `${this.apiUrl}/add`;

  getProducts(): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>(this.getApiUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.postApiUrl, product);
  }
}
