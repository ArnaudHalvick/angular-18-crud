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
        this.employeeForm.controls['employeeId'].setValue(1);
        this.employeeList.unshift(this.employeeForm.value);
      }
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));

      // Clear the form and reset the employeeId to 0
      this.clearForm();
    }
  }

  clearForm(): void {
    this.employeeForm.reset(); // Clear all fields
    this.employeeForm.controls['employeeId'].setValue(0); // Reset employeeId to 1
  }

  onEdit(item: EmployeeModel) {
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
    const updatedEmployee = this.employeeForm.value;

    // Find the index of the employee to update
    const index = this.employeeList.findIndex(
      emp => emp.employeeId === updatedEmployee.employeeId
    );

    if (index !== -1) {
      // Update the employee data in the list
      this.employeeList[index] = updatedEmployee;

      // Save the updated list back to localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
      }

      // Clear the form and reset the employeeId
      this.clearForm();
    }
  }

  onDelete(employeeId: number): void {
    // Confirm deletion with the user
    const confirmDelete = confirm(
      'Are you sure you want to delete this employee?'
    );

    if (confirmDelete) {
      // Filter out the employee with the given ID
      this.employeeList = this.employeeList.filter(
        emp => emp.employeeId !== employeeId
      );

      // Save the updated list back to localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
      }

      alert('Employee deleted successfully!');
    }
  }
}
