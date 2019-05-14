import { TestBed } from '@angular/core/testing';

import { ExamsubjectService } from './examsubject.service';

describe('ExamsubjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamsubjectService = TestBed.get(ExamsubjectService);
    expect(service).toBeTruthy();
  });
});
