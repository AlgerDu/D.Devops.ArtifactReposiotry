import { TestBed } from '@angular/core/testing';

import { ArtifactRepoService } from './artifact-repo.service';

describe('ArtifactRepoService', () => {
  let service: ArtifactRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtifactRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
