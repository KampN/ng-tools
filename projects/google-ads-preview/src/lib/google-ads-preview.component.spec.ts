import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAdsPreviewComponent } from './google-ads-preview.component';

describe('GoogleAdsPreviewComponent', () => {
  let component: GoogleAdsPreviewComponent;
  let fixture: ComponentFixture<GoogleAdsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleAdsPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAdsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
