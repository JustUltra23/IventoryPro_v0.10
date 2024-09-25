import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cargaGuard } from './carga.guard';

describe('cargaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cargaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
