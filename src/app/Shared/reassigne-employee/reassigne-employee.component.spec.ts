import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassigneEmployeeComponent } from './reassigne-employee.component';

describe('ReassigneEmployeeComponent', () => {
  let component: ReassigneEmployeeComponent;
  let fixture: ComponentFixture<ReassigneEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReassigneEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReassigneEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
