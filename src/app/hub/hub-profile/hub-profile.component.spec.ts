import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HubProfileComponent} from './hub-profile.component';

describe('HubProfileComponent', () => {
  let component: HubProfileComponent;
  let fixture: ComponentFixture<HubProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HubProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
