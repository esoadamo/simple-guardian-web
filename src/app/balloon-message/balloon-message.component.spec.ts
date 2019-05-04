import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BalloonMessageComponent} from './balloon-message.component';

describe('BalloonMessageComponent', () => {
  let component: BalloonMessageComponent;
  let fixture: ComponentFixture<BalloonMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BalloonMessageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalloonMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
