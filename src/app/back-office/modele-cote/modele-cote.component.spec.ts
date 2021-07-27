import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleCoteComponent } from './modele-cote.component';

describe('ModeleCoteComponent', () => {
  let component: ModeleCoteComponent;
  let fixture: ComponentFixture<ModeleCoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeleCoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeleCoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
