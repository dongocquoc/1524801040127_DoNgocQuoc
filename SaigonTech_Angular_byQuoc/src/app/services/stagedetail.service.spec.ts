import { TestBed } from '@angular/core/testing';

import { StagedetailService } from './stagedetail.service';

describe('StagedetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StagedetailService = TestBed.get(StagedetailService);
    expect(service).toBeTruthy();
  });
});
