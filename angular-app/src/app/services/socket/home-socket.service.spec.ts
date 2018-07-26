import { TestBed, inject } from '@angular/core/testing';

import { HomeSocketService } from './home-socket.service';

describe('HomeSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeSocketService]
    });
  });

  it('should be created', inject([HomeSocketService], (service: HomeSocketService) => {
    expect(service).toBeTruthy();
  }));
});
