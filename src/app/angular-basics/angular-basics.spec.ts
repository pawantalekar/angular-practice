import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularBasics } from './angular-basics';

describe('AngularBasics', () => {
  let component: AngularBasics;
  let fixture: ComponentFixture<AngularBasics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularBasics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularBasics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
