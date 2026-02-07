import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  size=200;
  initialYear = 2024;
  copyrightYear = 2025;
  developerName = 'Prasertsak U.';
  address = 'Nakhon Pathom, Thailand';
  telephone = '081-234-5678';
  displayContactInfo() {
    return 'Developer: ' + this.developerName + '\n' +
           'Address: ' + this.address + '\n' +
           'Telephone: ' + this.telephone;
  }
  aboutImageInfo() {
    return 'About image - size: ' + this.size + 'x'+(this.size*0.8);
  }
  alerrtImageInfo() {
    alert(this.aboutImageInfo());
  }
}
