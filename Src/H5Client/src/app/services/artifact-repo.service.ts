import { Injectable } from '@angular/core';
import { observable, Observable, of } from 'rxjs';
import { Search, SearchResult } from '../models/base';

export interface ArtifactRepo {
  code: string;
  name: string;
}

export interface ArtifactList {
  name: string;
  lastVersion: string;
  lastUpdateTime: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ArtifactRepoService {

  artifactRepos = [
    { code: "welcome", name: 'welcome' },
    { code: "test", name: 'test' }
  ];

  artifacts = [
    { name: "a1", lastVersion: "1.0", lastUpdateTime: new Date() },
    { name: "a2", lastVersion: "2.0", lastUpdateTime: new Date() },
    { name: "a3", lastVersion: "3.0", lastUpdateTime: new Date() }
  ]

  constructor() { }

  get(): Observable<ArtifactRepo[]> {
    return of(this.artifactRepos);
  }

  add(item: ArtifactRepo): Observable<any> {
    this.artifactRepos.push(item);
    return of<any>(null);
  }

  getArtifacts(repo: ArtifactRepo, search: Search): Observable<SearchResult<ArtifactList>> {

    var rst: SearchResult<ArtifactList> = {
      code: 0,
      page: { size: 10, index: 1 },
      datas: this.artifacts,
      totalCount: 20
    };

    return of(rst);
  }
}
