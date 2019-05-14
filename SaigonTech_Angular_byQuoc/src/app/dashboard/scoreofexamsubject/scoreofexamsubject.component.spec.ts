import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreofexamsubjectComponent } from './scoreofexamsubject.component';

describe('ScoreofexamsubjectComponent', () => {
  let component: ScoreofexamsubjectComponent;
  let fixture: ComponentFixture<ScoreofexamsubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreofexamsubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreofexamsubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
