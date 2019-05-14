import { TestBed } from '@angular/core/testing';

import { CandidatedocumentService } from './candidatedocument.service';

describe('CandidatedocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandidatedocumentService = TestBed.get(CandidatedocumentService);
    expect(service).toBeTruthy();
  });
});
