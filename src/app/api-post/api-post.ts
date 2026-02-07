import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../services/product';


@Component({
  selector: 'app-api-post',
  imports: [FormsModule, CommonModule],
  templateUrl: './api-post.html',
  styleUrl: './api-post.css'
})
export class ApiPostComponent {
  product: Product = { id: 0, title: '', price: 0, category: '' };
  response: Product | null = null;

  constructor(private apiService: ProductService) { }

  onSubmit(form: any) {
    if (form.valid) {
      this.apiService.addProduct(this.product).subscribe({
        next: (res: Product) => {
          this.response = res;
        },
        error: (err: unknown) => {
          console.error('Error adding product:', err);
        }
      });
    } else {
      console.warn('Form ไม่ถูกต้อง ไม่ส่งข้อมูลไปยัง API');
    }
  }
}