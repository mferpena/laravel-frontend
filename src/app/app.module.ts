import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultationEmployeesComponent } from './components/consultation-employees/consultation-employees.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormEmployeeComponent } from './components/consultation-employees/form-employee/form-employee.component';
import { SnackBarComponent } from './components/consultation-employees/form-employee/snack-bar/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const components = [
  ConsultationEmployeesComponent,
  FormEmployeeComponent,
  SnackBarComponent,
];

const material = [MatDialogModule, MatSnackBarModule];

@NgModule({
  declarations: [AppComponent, components],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    material,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
