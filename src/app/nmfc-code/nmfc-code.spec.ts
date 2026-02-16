import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmfcCode } from './nmfc-code';

describe('NmfcCode', () => {
  let component: NmfcCode;
  let fixture: ComponentFixture<NmfcCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NmfcCode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NmfcCode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
