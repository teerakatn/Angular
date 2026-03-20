import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService, Product } from '../core/data-access/product.service';


@Component({
  selector: 'app-api-post',
  imports: [FormsModule, CommonModule],
  templateUrl: './api-post.html',
  styleUrl: './api-post.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiPostComponent {
  private readonly apiService = inject(ProductService);

  product: Product = { id: 0, title: '', price: 0, category: '' };
  response = signal<Product | null>(null);
  error = signal<string | null>(null);

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.error.set(null);
      this.apiService.addProduct(this.product).subscribe({
        next: (res: Product) => {
          this.response.set(res);
        },
        error: (err: unknown) => {
          this.error.set('เพิ่มสินค้าไม่สำเร็จ กรุณาลองใหม่');
          console.error('Error adding product:', err);
        }
      });
    } else {
      console.warn('Form ไม่ถูกต้อง ไม่ส่งข้อมูลไปยัง API');
    }
  }
}