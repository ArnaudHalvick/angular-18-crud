export class EmployeeModel {
  employeeId: number;
  name: string;
  city: string;
  state: string;
  emailId: string;
  contactNo: string;
  address: string;

  constructor() {
    this.employeeId = 0;
    this.name = '';
    this.city = '';
    this.state = '';
    this.emailId = '';
    this.contactNo = '';
    this.address = '';
  }
}
