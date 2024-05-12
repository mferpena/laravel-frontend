import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { FormEmployeeComponent } from './form-employee/form-employee.component';

@Component({
  selector: 'app-consultation-employees',
  templateUrl: './consultation-employees.component.html',
  styleUrls: ['./consultation-employees.component.scss'],
})
export class ConsultationEmployeesComponent implements OnInit {
  employees: any[] = [];
  searchForm!: FormGroup;
  showConfirmDeleteModal = false;
  selectedEmployee: any;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      area: [''],
      idType: [''],
      idNumber: [''],
      employmentCountry: [''],
      email: [''],
      status: [''],
    });

    this.getEmployeeList({});
  }

  openCreateDialog() {
    this.dialog.open(FormEmployeeComponent, {
      data: { mode: 'create' },
    });
  }

  openUpdateDialog(employee: any) {
    this.dialog.open(FormEmployeeComponent, {
      data: { mode: 'update', employeeData: employee },
    });
  }

  getEmployeeList(filters: any): void {
    this.employeeService
      .getEmployeeList(filters)
      .then((response: any) => {
        this.employees = response.data;
      })
      .catch((error) => {
        console.error('Error al obtener la lista de empleados:', error);
      });
  }

  searchEmployees(): void {
    const filters = this.searchForm.value;
    this.getEmployeeList(filters);
  }

  openConfirmDeleteModal(employee: any) {
    this.selectedEmployee = employee;
    this.showConfirmDeleteModal = true;
  }

  closeConfirmDeleteModal() {
    this.showConfirmDeleteModal = false;
  }

  deleteEmployee() {
    if (this.selectedEmployee) {
      this.employeeService
        .deactivateEmployee(this.selectedEmployee.id)
        .then((response: any) => {
          this.getEmployeeList({});
          this.closeConfirmDeleteModal();
        })
        .catch((error) => {
          console.error('Error al eliminar el empleado:', error);
        });
    }
  }
}
