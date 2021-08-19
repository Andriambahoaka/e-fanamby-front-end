import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesOperationsComponent } from './mes-operations.component';

describe('MesOperationsComponent', () => {
  let component: MesOperationsComponent;
  let fixture: ComponentFixture<MesOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
