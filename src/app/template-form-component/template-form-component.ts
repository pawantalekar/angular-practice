import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-form-component',
  imports: [FormsModule],
  templateUrl: './template-form-component.html',

})
export class TemplateFormComponent {

  userObj:any ={
    email: '',
    Password : '',
    address : '',
    city : '',
    state : 'Gujrat',
    zip : '',
    isAgree : false
  }
  onSave(){
    const formData = this.userObj;
    console.log('Form Data Submitted: ', formData);
    alert("form submitted successfully");
  }
}
