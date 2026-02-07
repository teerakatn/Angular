import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  selectedShape = '';
  radius = 0;
  circleArea = 0;
  circumference = 0;
  base = 0;
  height = 0;
  triangleArea = 0;

  calculateCircleData() {
    this.circleArea = Number((Math.PI * Math.pow(this.radius, 2)).toFixed(2));
    this.circumference = Number((2 * Math.PI * this.radius).toFixed(2));
  }
  calculateTriangleData() {
    this.triangleArea = Number((0.5 * this.base * this.height).toFixed(2));
  }
  clearData() {
    this.radius = 0;
    this.circleArea = 0;
    this.circumference = 0;
    this.base = 0;
    this.height = 0;
    this.triangleArea = 0;
  }
}
