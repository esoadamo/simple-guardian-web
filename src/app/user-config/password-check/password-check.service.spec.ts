import {TestBed} from '@angular/core/testing';

import {PasswordCheckService} from './password-check.service';

describe('PasswordCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordCheckService = TestBed.get(PasswordCheckService);
    expect(service).toBeTruthy();
  });
});
