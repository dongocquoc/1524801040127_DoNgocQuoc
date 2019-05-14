import { TestBed } from '@angular/core/testing';

import { InputtypeService } from './inputtype.service';

describe('InputtypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputtypeService = TestBed.get(InputtypeService);
    expect(service).toBeTruthy();
  });
});
