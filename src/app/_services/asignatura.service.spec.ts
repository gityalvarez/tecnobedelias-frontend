import { TestBed, inject } from '@angular/core/testing';

import { AsignaturaService } from './asignatura.service';

describe('AsignaturaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsignaturaService]
    });
  });

  it('should be created', inject([AsignaturaService], (service: AsignaturaService) => {
    expect(service).toBeTruthy();
  }));
});
