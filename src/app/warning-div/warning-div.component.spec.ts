import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WarningDivComponent} from './warning-div.component';

describe('WarningDivComponent', () => {
  let component: WarningDivComponent;
  let fixture: ComponentFixture<WarningDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WarningDivComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
