import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeRepository {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerEmployee(employeeData: any): Observable<any> {
    return this.http.post(this.baseUrl + 'employee-registration', employeeData);
  }

  deactivateEmployee(employeeId: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'employee-deactivate/' + employeeId);
  }

  editEmployee(employeeId: number, employeeData: any): Observable<any> {
    return this.http.put(
      this.baseUrl + 'employee-edit/' + employeeId,
      employeeData
    );
  }

  getEmployeeList(filters: any): Observable<any> {
    let queryString = '';
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        queryString += `${key}=${filters[key]}&`;
      }
    });
    queryString = queryString.slice(0, -1);
    return this.http.get(this.baseUrl + `employee-list?${queryString}`);
  }
}
