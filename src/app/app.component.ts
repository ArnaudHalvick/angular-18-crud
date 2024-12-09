import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  createForm(): FormGroup {
    return new FormGroup({
      employeeId: new FormControl(this.employeeObj.employeeId),
      firstName: new FormControl(this.employeeObj.firstName, [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl(this.employeeObj.lastName, [
        Validators.required,
        Validators.minLength(2),
      ]),
      city: new FormControl(this.employeeObj.city, [
        Validators.required,
        Validators.minLength(3),
      ]),
      state: new FormControl(this.employeeObj.state, [
        Validators.required,
        Validators.minLength(2),
      ]),
      emailId: new FormControl(this.employeeObj.emailId, [
        Validators.required,
        Validators.email,
      ]),
      contactNo: new FormControl(this.employeeObj.contactNo, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      postalCode: new FormControl(this.employeeObj.postalCode, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      address: new FormControl(this.employeeObj.address, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  loadEmployeeData(): void {
    if (this.isLocalStorageAvailable()) {
      const oldData = localStorage.getItem('EmpData');
      if (oldData !== null) {
        this.employeeList = JSON.parse(oldData);
      }
    } else {
      console.warn('LocalStorage is not available.');
    }
  }

  onSave(): void {
    if (this.employeeForm.invalid) {
      alert('Please correct the form errors before saving.');
      return;
    }

    if (this.isLocalStorageAvailable()) {
      const oldData = localStorage.getItem('EmpData');
      if (oldData !== null) {
        const parsedData = JSON.parse(oldData);
        this.employeeForm.controls['employeeId'].setValue(
          parsedData.length + 1
        );
        this.employeeList.unshift(this.employeeForm.value);
      } else {
        this.employeeForm.controls['employeeId'].setValue(1);
        this.employeeList.unshift(this.employeeForm.value);
      }
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
      this.clearForm();
    } else {
      console.warn('LocalStorage is not available.');
    }
  }

  clearForm(): void {
    this.employeeForm.reset();
    this.employeeForm.controls['employeeId'].setValue(0);
  }

  onEdit(item: EmployeeModel): void {
    this.employeeForm.patchValue({
      employeeId: item.employeeId,
      firstName: item.firstName,
      lastName: item.lastName,
      city: item.city,
      state: item.state,
      emailId: item.emailId,
      contactNo: item.contactNo,
      postalCode: item.postalCode,
      address: item.address,
    });
  }

  onUpdate(): void {
    if (this.employeeForm.invalid) {
      alert('Please correct the form errors before updating.');
      return;
    }

    const updatedEmployee = this.employeeForm.value;
    const index = this.employeeList.findIndex(
      emp => emp.employeeId === updatedEmployee.employeeId
    );

    if (index !== -1) {
      this.employeeList[index] = updatedEmployee;
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
      }
      this.clearForm();
    }
  }

  onDelete(employeeId: number): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete this employee?'
    );

    if (confirmDelete) {
      this.employeeList = this.employeeList.filter(
        emp => emp.employeeId !== employeeId
      );

      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
      }

      alert('Employee deleted successfully!');
    }
  }
}
