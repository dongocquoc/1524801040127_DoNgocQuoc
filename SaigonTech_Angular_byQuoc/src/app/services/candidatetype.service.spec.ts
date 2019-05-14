import { TestBed } from '@angular/core/testing';

import { CandidatetypeService } from './candidatetype.service';

describe('CandidatetypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandidatetypeService = TestBed.get(CandidatetypeService);
    expect(service).toBeTruthy();
  });
});
