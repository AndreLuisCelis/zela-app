import { TestBed } from '@angular/core/testing';

import { ZelaService} from './zela-service';

describe('ZelaServiceTs', () => {
  let service: ZelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
