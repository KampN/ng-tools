import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgLoggerFsComponent } from './ng-logger-fs.component';

describe('NgLoggerFsComponent', () => {
  let component: NgLoggerFsComponent;
  let fixture: ComponentFixture<NgLoggerFsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgLoggerFsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgLoggerFsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
