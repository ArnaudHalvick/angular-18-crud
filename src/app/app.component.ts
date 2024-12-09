import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Fixed typo
})
export class AppComponent {
  title = 'angular-18-crud';
  employeeForm: FormGroup;
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor() {
    this.employeeForm = this.createForm();
    this.loadEmployeeData();
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

  loadEmployeeData(): void {
    if (typeof localStorage !== 'undefined') {
      const oldData = localStorage.getItem('EmpData');
      if (oldData !== null) {
        this.employeeList = JSON.parse(oldData);
      }
    }
  }

  onSave(): void {
    if (typeof localStorage !== 'undefined') {
      const oldData = localStorage.getItem('EmpData');
      if (oldData !== null) {
        const parsedData = JSON.parse(oldData);
        this.employeeForm.controls['employeeId'].setValue(
          parsedData.length + 1
        );
        this.employeeList.unshift(this.employeeForm.value);
      } else {
        this.employeeForm.controls['employeeId'];
        this.employeeList.unshift(this.employeeForm.value);
      }
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    }
  }
}
