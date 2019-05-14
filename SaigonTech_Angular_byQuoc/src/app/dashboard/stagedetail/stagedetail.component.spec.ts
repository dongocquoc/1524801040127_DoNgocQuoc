import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagedetailComponent } from './stagedetail.component';

describe('StagedetailComponent', () => {
  let component: StagedetailComponent;
  let fixture: ComponentFixture<StagedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
