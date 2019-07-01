import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HubProfileSendComponent} from './hub-profile-send.component';

describe('HubProfileSendComponent', () => {
  let component: HubProfileSendComponent;
  let fixture: ComponentFixture<HubProfileSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HubProfileSendComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubProfileSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
