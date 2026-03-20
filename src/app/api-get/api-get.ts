import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { Product, ProductService } from '../core/data-access/product.service';

@Component({
  selector: 'app-api-get',
  imports: [CommonModule],
  templateUrl: './api-get.html',
  styleUrl: './api-get.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiGetComponent {
  private readonly apiService = inject(ProductService);

  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  loadProducts(): void {
    this.loading.set(true);
    this.error.set(null);

    this.apiService
      .getProducts()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: { products: Product[] }) => {
          this.products.set(res.products);
        },
        error: (err: unknown) => {
          this.error.set('โหลดข้อมูลไม่สำเร็จ กรุณาลองใหม่');
          console.error('Error fetching products:', err);
        }
      });
  }
}