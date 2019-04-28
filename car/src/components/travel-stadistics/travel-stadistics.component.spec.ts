import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelStadisticsComponent } from './travel-stadistics.component';

describe('TravelStadisticsComponent', () => {
  let component: TravelStadisticsComponent;
  let fixture: ComponentFixture<TravelStadisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelStadisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelStadisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
