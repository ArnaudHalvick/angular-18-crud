import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-18-crud';
  employeeForm: FormGroup;
  employeeObj: EmployeeModel = new EmployeeModel();

  constructor() {
    this.employeeForm = this.createForm();
  }

  createForm(): FormGroup {
    return new FormGroup({
      employeeId: new FormControl(this.employeeObj.employeeId),
      firstName: new FormControl(this.employeeObj.firstName),
      lastName: new FormControl(this.employeeObj.lastName),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
      emailId: new FormControl(this.employeeObj.emailId),
      contactNo: new FormControl(this.employeeObj.contactNo),
      postalCode: new FormControl(this.employeeObj.postalCode),
      address: new FormControl(this.employeeObj.address),
    });
  }
}
