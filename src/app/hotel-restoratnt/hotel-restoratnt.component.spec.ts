import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelRestoratntComponent } from './hotel-restoratnt.component';

describe('HotelRestoratntComponent', () => {
  let component: HotelRestoratntComponent;
  let fixture: ComponentFixture<HotelRestoratntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelRestoratntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelRestoratntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
