import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-template',
  imports: [FormsModule],
  templateUrl: './form-template.html',
  styleUrl: './form-template.css'
})
export class FormTemplateComponent {
  // ข้อมูลโมเดลสำหรับผูกกับ ngModel
  user = {
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  };

  onSubmit() {
    console.log('Template Form Submitted:', this.user);
    alert('ลงทะเบียนสำเร็จ (Template-driven)');
  }
}

