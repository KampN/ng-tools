import { TestBed } from '@angular/core/testing';

import { NgLoggerFsService } from './ng-logger-fs.service';

describe('NgLoggerFsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgLoggerFsService = TestBed.get(NgLoggerFsService);
    expect(service).toBeTruthy();
  });
});
