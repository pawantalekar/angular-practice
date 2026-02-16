import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeNgFiltering } from './prime-ng-filtering';

describe('PrimeNgFiltering', () => {
  let component: PrimeNgFiltering;
  let fixture: ComponentFixture<PrimeNgFiltering>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeNgFiltering]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeNgFiltering);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
