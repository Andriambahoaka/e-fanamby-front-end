import { TestBed } from '@angular/core/testing';

import { ModeleCoteService } from './modele-cote.service';

describe('ModeleCoteService', () => {
  let service: ModeleCoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeleCoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
