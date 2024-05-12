import { Injectable } from '@angular/core';
import { EmployeeRepository } from '../repositories/employee.repository';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  registerEmployee(employeeData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.employeeRepository.registerEmployee(employeeData).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (error) => {
          console.error('Error registering employee:', error);
          const customError = new Error(
            'Error registering employee: ' + error.message
          );
          reject(customError);
        },
      });
    });
  }

  editEmployee(employeeId: number, employeeData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.employeeRepository.editEmployee(employeeId, employeeData).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (e) => {
          console.error('Error editing employee:', e);
          const customError = new Error(e.message);
          reject(customError);
        },
      });
    });
  }

  deactivateEmployee(employeeId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.employeeRepository.deactivateEmployee(employeeId).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (e) => {
          console.error('Error deactivate employee:', e);
          const customError = new Error(e.message);
          reject(customError);
        },
      });
    });
  }

  getEmployeeList(filters: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.employeeRepository.getEmployeeList(filters).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (e) => {
          console.error('Error getting employee list:', e);
          const customError = new Error(e.message);
          reject(customError);
        },
      });
    });
  }
}
