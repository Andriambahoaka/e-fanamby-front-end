import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCoteComponent } from './type-cote.component';

describe('TypeCoteComponent', () => {
  let component: TypeCoteComponent;
  let fixture: ComponentFixture<TypeCoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeCoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeCoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
