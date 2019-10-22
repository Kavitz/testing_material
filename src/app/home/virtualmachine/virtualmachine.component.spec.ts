import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineComponent } from './virtualmachine.component';

describe('VirtualmachineComponent', () => {
  let component: VirtualmachineComponent;
  let fixture: ComponentFixture<VirtualmachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualmachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualmachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
