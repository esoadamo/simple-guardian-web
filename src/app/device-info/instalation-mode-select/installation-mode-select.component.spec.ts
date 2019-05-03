import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InstallationModeSelectComponent} from './installation-mode-select.component';

describe('InstallationModeSelectComponent', () => {
  let component: InstallationModeSelectComponent;
  let fixture: ComponentFixture<InstallationModeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstallationModeSelectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationModeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
