import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, of } from 'rxjs';
import { DataResult, Result, Search, SearchResult } from '../models/base';
import { ApiUrl } from '../models/urls';

export interface ArtifactRepo {
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtifactRepoService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<ArtifactRepo[]> {
    return this.http.get<ArtifactRepo[]>(ApiUrl.getRepos);
  }

  add(item: ArtifactRepo): Observable<Result> {

    item.code = item.code.toLowerCase();

    return this.http.post<Result>(ApiUrl.addRepos,item,this.httpOptions);
  }

  getDetail(repoCode:string):Observable<DataResult<ArtifactRepo>> {
    return this.http.get<DataResult<ArtifactRepo>>(ApiUrl.reposBase+"/" +repoCode.toLowerCase());
  }
}
