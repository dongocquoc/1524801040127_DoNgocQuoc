import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsubjectComponent } from './examsubject.component';

describe('ExamsubjectComponent', () => {
  let component: ExamsubjectComponent;
  let fixture: ComponentFixture<ExamsubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamsubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamsubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
