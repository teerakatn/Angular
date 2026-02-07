import { Component } from '@angular/core';
import { ProgressBar } from '../progress-bar/progress-bar';

@Component({
  selector: 'app-student',
  imports: [ProgressBar],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student {
  studentParticipation: any[] = [
    { id: 'S001', firstName: 'Alice', lastName: 'Smith', participationPercent:85 },
    { id: 'S002', firstName: 'Bob', lastName: 'Johnson', participationPercent: 92 },
    { id: 'S003', firstName: 'Charlie', lastName: 'Brown', participationPercent: 78 },
  ];
  onProgressUpdated(ev:any) {
    let newValue = ev.progress;
    console.log('Progress updated',newValue);
    const student = this.studentParticipation.find(s => s.id === ev.trackId);
    if (student !== undefined) {
      student.participationPercent = newValue;
    }
  }

}
