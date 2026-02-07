import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../services/product';

@Component({
  selector: 'app-api-get',
  imports: [CommonModule],
  templateUrl: './api-get.html',
  styleUrl: './api-get.css'
})
export class ApiGetComponent {
  products: Product[] = [];

  constructor(private apiService: ProductService) {}

  loadProducts() {
    this.apiService.getProducts().subscribe({
      next: (res: { products: Product[] }) => {
        this.products = res.products;
      },
      error: (err: unknown) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}