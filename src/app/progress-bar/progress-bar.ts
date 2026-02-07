import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.html',
  styleUrls: ['./progress-bar.css']
})
export class ProgressBar {
  @Input() trackId!: any;
  @Input() progress: number = 0;
  @Input() color: string = 'blue';
  @Input() height: string = '20px';
  @Input() showLabel: boolean = true; // เปิด/ปิดการแสดงข้อความ

  // Output event เมื่อ progress เปลี่ยน
  @Output() progressChanged = new EventEmitter<{trackId: any, progress: number}>();

  // ฟังก์ชันสำหรับอัปเดตค่า
  updateProgress(progressValue: number) {    
    this.progress = Math.min(progressValue+5, 100); // เพิ่มค่า progress ทีละ 5 ไม่เกิน 100
    this.progressChanged.emit({trackId: this.trackId, progress: this.progress}); // ส่งค่าออกไป
  }
}
