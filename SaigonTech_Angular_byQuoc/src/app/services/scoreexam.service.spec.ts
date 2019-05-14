import { TestBed } from '@angular/core/testing';

import { ScoreexamService } from './scoreexam.service';

describe('ScoreexamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScoreexamService = TestBed.get(ScoreexamService);
    expect(service).toBeTruthy();
  });
});
