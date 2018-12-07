import { TestBed } from '@angular/core/testing';

import { OpenLigaDbService } from './openligadb.service';

describe('OpenLigaDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenLigaDbService = TestBed.get(OpenLigaDbService);
    expect(service).toBeTruthy();
  });
});
