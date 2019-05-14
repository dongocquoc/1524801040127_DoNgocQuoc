import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatetypeComponent } from './candidatetype.component';

describe('CandidatetypeComponent', () => {
  let component: CandidatetypeComponent;
  let fixture: ComponentFixture<CandidatetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
