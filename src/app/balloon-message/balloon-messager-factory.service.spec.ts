import {TestBed} from '@angular/core/testing';

import {BalloonMessageFactoryService} from './balloon-message-factory.service';

describe('BalloonMessageFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BalloonMessageFactoryService = TestBed.get(BalloonMessageFactoryService);
    expect(service).toBeTruthy();
  });
});
