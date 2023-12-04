import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarFiltersPageComponent } from './car-filters-page.component';

describe('CarFiltersPageComponent', () => {
  let component: CarFiltersPageComponent;
  let fixture: ComponentFixture<CarFiltersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarFiltersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarFiltersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
