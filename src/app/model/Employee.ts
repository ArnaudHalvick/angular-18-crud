export class EmployeeModel {
  employeeId: number;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  emailId: string;
  contactNo: string;
  postalCode: string;
  address: string;

  constructor() {
    this.employeeId = 0;
    this.firstName = '';
    this.lastName = '';
    this.city = '';
    this.state = '';
    this.emailId = '';
    this.contactNo = '';
    this.address = '';
    this.postalCode = '';
  }
}
