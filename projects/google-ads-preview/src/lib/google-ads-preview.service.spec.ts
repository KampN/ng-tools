import { TestBed } from '@angular/core/testing';

import { GoogleAdsPreviewService } from './google-ads-preview.service';

describe('GoogleAdsPreviewService', () => {
  let service: GoogleAdsPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleAdsPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
