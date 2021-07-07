import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ArtifactRepo {
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtifactRepoService {

  artifactRepos = [
    { code: "welcome", name: 'Dr Nice' },
    { code: "test", name: 'Dr Nice' }
  ];

  constructor() { }

  get(): Observable<ArtifactRepo[]> {
    return of(this.artifactRepos);
  }

  add(item: ArtifactRepo): Observable<void> {
    this.artifactRepos.push(item);
    return of();
  }
}
