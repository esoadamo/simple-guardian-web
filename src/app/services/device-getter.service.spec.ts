import {TestBed} from '@angular/core/testing';

import {DeviceGetterService} from './device-getter.service';

describe('DeviceGetterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceGetterService = TestBed.get(DeviceGetterService);
    expect(service).toBeTruthy();
  });
});
