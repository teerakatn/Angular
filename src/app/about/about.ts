import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  size=200;
  initialYear = 2025;
  copyrightYear = 2026;
  developerName = 'Teerakarn Boonmark';
  address = 'Nakhon Pathom, Thailand';
  telephone = '081-418-4720';
  displayContactInfo() {
    return 'Developer: ' + this.developerName + '\n' +
           'Address: ' + this.address + '\n' +
           'Telephone: ' + this.telephone;
  }
  aboutImageInfo() {
    return 'About image - size: ' + this.size + 'x'+(this.size*0.8);
  }
  alertImageInfo() {
    alert(this.aboutImageInfo());
  }
}
