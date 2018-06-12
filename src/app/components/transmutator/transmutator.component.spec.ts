import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmutatorComponent } from './transmutator.component';

describe('TransmutatorComponent', () => {
  let component: TransmutatorComponent;
  let fixture: ComponentFixture<TransmutatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmutatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmutatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
