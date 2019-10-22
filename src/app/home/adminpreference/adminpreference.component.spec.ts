import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpreferenceComponent } from './adminpreference.component';

describe('AdminpreferenceComponent', () => {
  let component: AdminpreferenceComponent;
  let fixture: ComponentFixture<AdminpreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
