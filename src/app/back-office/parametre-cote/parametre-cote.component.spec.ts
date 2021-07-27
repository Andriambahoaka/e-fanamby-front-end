import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreCoteComponent } from './parametre-cote.component';

describe('ParametreCoteComponent', () => {
  let component: ParametreCoteComponent;
  let fixture: ComponentFixture<ParametreCoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreCoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreCoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
