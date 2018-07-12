import { TestBed, inject } from '@angular/core/testing';

import { UtentiConnessiBadgeService } from './utenti-connessi-badge.service';

describe('UtentiConnessiBadgeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtentiConnessiBadgeService]
    });
  });

  it('should be created', inject([UtentiConnessiBadgeService], (service: UtentiConnessiBadgeService) => {
    expect(service).toBeTruthy();
  }));
});
