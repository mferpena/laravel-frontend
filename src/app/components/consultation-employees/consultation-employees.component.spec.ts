import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationEmployeesComponent } from './consultation-employees.component';

describe('ConsultationEmployeesComponent', () => {
  let component: ConsultationEmployeesComponent;
  let fixture: ComponentFixture<ConsultationEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationEmployeesComponent]
    });
    fixture = TestBed.createComponent(ConsultationEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
