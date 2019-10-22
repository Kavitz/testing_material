import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserveruserComponent } from './observeruser.component';

describe('ObserveruserComponent', () => {
  let component: ObserveruserComponent;
  let fixture: ComponentFixture<ObserveruserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObserveruserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObserveruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
