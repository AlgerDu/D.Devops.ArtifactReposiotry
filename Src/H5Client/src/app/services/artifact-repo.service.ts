import { Injectable } from '@angular/core';
import { observable, Observable, of } from 'rxjs';

export interface ArtifactRepo {
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtifactRepoService {

  artifactRepos = [
    { code: "welcome", name: 'welcome' },
    { code: "test", name: 'test' }
  ];

  constructor() { }

  get(): Observable<ArtifactRepo[]> {
    return of(this.artifactRepos);
  }

  add(item: ArtifactRepo): Observable<any> {
    this.artifactRepos.push(item);
    return of<any>(null);
  }
}
