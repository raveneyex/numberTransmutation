import { TestBed, inject } from '@angular/core/testing';

import { TransmutationService } from './transmutation.service';

describe('TransmutationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransmutationService]
    });
  });

  it('should be created', inject([TransmutationService], (service: TransmutationService) => {
    expect(service).toBeTruthy();
  }));
});
