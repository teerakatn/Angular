import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, 
  FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-reactive',
  imports: [ReactiveFormsModule],
  templateUrl: './form-reactive.html',
  styleUrl: './form-reactive.css'
})
export class FormReactiveComponent {
  private fbuild = inject(FormBuilder);

  // กำหนดโครงสร้าง Form พร้อม Validation
  regForm = this.fbuild.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, 
                    Validators.minLength(8)]]
  });

  onSubmit() {
    if (this.regForm.valid) {
      console.log('Reactive Form Submitted:', this.regForm.value);
      alert('ลงทะเบียนสำเร็จ (Reactive Form)');
    } else {
      // สั่งให้ทุก field แสดง error ถ้ากดยืนยันทั้งที่ยังกรอกไม่ครบ
      this.regForm.markAllAsTouched();
    }
  }
} 

