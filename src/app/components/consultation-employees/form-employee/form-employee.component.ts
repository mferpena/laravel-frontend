import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.scss'],
})
export class FormEmployeeComponent {
  mode!: 'create' | 'update';
  employeeData: any;
  employeeForm!: FormGroup;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  durationInSeconds = 5;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormEmployeeComponent>,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.mode = this.data.mode;
    this.employeeData = this.data.employeeData;
    this.initializeForm();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  initializeForm() {
    this.employeeForm = this.fb.group({
      paternalName: [
        this.employeeData ? this.employeeData.paternal_name : '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]+$/),
          Validators.maxLength(20),
        ],
      ],
      maternalName: [
        this.employeeData ? this.employeeData.maternal_name : '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]+$/),
          Validators.maxLength(20),
        ],
      ],
      firstName: [
        this.employeeData ? this.employeeData.first_name : '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]+$/),
          Validators.maxLength(20),
        ],
      ],
      otherNames: [
        this.employeeData ? this.employeeData.other_names : '',
        [Validators.pattern(/^[A-Z ]+$/), Validators.maxLength(50)],
      ],
      employmentCountry: [
        this.employeeData ? this.employeeData.employment_country : '',
        Validators.required,
      ],
      idType: [
        this.employeeData ? this.employeeData.id_type : '',
        Validators.required,
      ],
      idNumber: [
        this.employeeData ? this.employeeData.id_number : '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9-]+$/),
          Validators.maxLength(20),
        ],
      ],
      area: [
        this.employeeData ? this.employeeData.area : '',
        Validators.required,
      ],
      estado: ['Activo'],
    });
  }

  submitForm() {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      const mappedData = {
        first_name: formData.firstName,
        paternal_name: formData.paternalName,
        maternal_name: formData.maternalName,
        other_names: formData.otherNames,
        employment_country: formData.employmentCountry,
        id_type: formData.idType,
        id_number: formData.idNumber,
        area: formData.area,
        estado: formData.estado,
      };
      if (this.mode === 'create') {
        this.employeeService
          .registerEmployee(mappedData)
          .then((response) => {
            this.openSnackBar();
            // console.log('Empleado registrado exitosamente:', response);
            this.dialogRef.close();
          })
          .catch((error) => {
            console.error('Error al registrar empleado:', error);
          });
      } else if (this.mode === 'update' && this.employeeData) {
        const employeeId = this.employeeData.id;
        this.employeeService
          .editEmployee(employeeId, mappedData)
          .then((response) => {
            this.openSnackBar();
            // console.log('Empleado editado exitosamente:', response);
            this.dialogRef.close();
          })
          .catch((error) => {
            console.error('Error al editar empleado:', error);
          });
      }
    }
  }
}
