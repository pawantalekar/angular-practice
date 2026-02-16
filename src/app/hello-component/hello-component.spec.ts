import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { HelloComponent } from './hello-component';

describe('HelloComponent', () => {
  let component: HelloComponent;
  let fixture: ComponentFixture<HelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloComponent],
      providers: [provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should greet with Good Morningg', () => {
    expect(component.greetings()).toBe('Good Morning!');
  });


  it('should return the name ', () => {
    const name = 'pawan';
    expect(component.showName(name)).toEqual('pawan');
  });

  it('should return false if empty ', () => {
    expect(component.isNameValid(' ')).toBeFalse();
  });

  it('should return false if the string length is lesss than 3',()=>{
    expect(component.isNameValid(' pa ')).toBeFalse();
  });

  it('should return true if length is 3 ',()=>{
    expect(component.isNameValid(' paw  ')).toBeTrue();
  });
  
});
