import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'https://dummyjson.com/products';
  private getApiUrl = this.apiUrl + '?limit=10&skip=10&select=id,title,price,category';
  private postApiUrl = this.apiUrl + '/add';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>(this.getApiUrl);
  }
  // POST add product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.postApiUrl, product);
  }
}