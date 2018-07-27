import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtentiConnessiBadgeComponent } from './utenti-connessi-badge.component';

describe('UtentiConnessiBadgeComponent', () => {
  let component: UtentiConnessiBadgeComponent;
  let fixture: ComponentFixture<UtentiConnessiBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtentiConnessiBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtentiConnessiBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
