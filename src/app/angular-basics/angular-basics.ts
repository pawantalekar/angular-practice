import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-angular-basics',
  imports: [FormsModule],
  templateUrl: './angular-basics.html',
  styleUrl: './angular-basics.css',
})
export class AngularBasics {

  name: string = '';

  onClickSUbmit(inpname: string) {
    this.name = inpname;
  }
}
