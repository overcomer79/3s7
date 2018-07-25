import { TestBed, inject } from '@angular/core/testing';

import { GeneralInfoSocketService } from './general-info-socket.service';

describe('GeneralInfoSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralInfoSocketService]
    });
  });

  it('should be created', inject([GeneralInfoSocketService], (service: GeneralInfoSocketService) => {
    expect(service).toBeTruthy();
  }));
});
