import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpliaiWidgetComponent } from './simpliai-widget.component';

describe('SimpliaiWidget', () => {
  let component: SimpliaiWidgetComponent;
  let fixture: ComponentFixture<SimpliaiWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpliaiWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpliaiWidgetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
