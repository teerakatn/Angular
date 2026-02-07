import { Component, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shape',
  imports: [FormsModule],
  templateUrl: './shape.html',
})
export class Shape {
  // signal สำหรับเลือกชนิดรูปทรง
  selectedShape = signal<'circle' | 'triangle' | null>(null);
  // signal สำหรับค่าที่กรอก
  radius = signal<number>(0);
  base = signal<number>(0);
  height = signal<number>(0);

  // computed สำหรับคำนวณพื้นที่
  circleArea = computed(() => Number(Math.PI * Math.pow(this.radius(), 2)).toFixed(2));
  triangleArea = computed(() => Number(0.5 * this.base() * this.height()).toFixed(2));

  constructor() {
    // effect: ทำงานทุกครั้งที่ selectedShape เปลี่ยน
    effect(() => {
      if (this.selectedShape()) {
        this.radius.set(0);
        this.base.set(0);
        this.height.set(0);
        console.log(`ผู้ใช้เลือกฟอร์ม: ${this.selectedShape()}`);
      }
    });

    // effect: ทำงานเมื่อพื้นที่วงกลมเปลี่ยน
    effect(() => {
      if (this.selectedShape() === 'circle') {
        console.log(`พื้นที่วงกลมใหม่: ${this.circleArea()}`);
      }
    });

    // effect: ทำงานเมื่อพื้นที่สามเหลี่ยมเปลี่ยน
    effect(() => {
      if (this.selectedShape() === 'triangle') {
        console.log(`พื้นที่สามเหลี่ยมใหม่: ${this.triangleArea()}`);
      }
    });
  }
  updateRadius(event: Event) {
    const input = event.target as HTMLInputElement;
    this.radius.set(Number(input.value));
  }
  updateBase(event: Event) {
    const input = event.target as HTMLInputElement;
    this.base.set(Number(input.value));
  }
  updateHeight(event: Event) {
    const input = event.target as HTMLInputElement;
    this.height.set(Number(input.value));
  }
}
