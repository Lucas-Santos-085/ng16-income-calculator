import { TestBed } from '@angular/core/testing';

import { TaxaJurosService } from './taxa-juros.service';

describe('TaxaJurosService', () => {
  let service: TaxaJurosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxaJurosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
