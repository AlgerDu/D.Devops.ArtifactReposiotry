import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SearchResult, Search, Result, DataResult } from '../models/base';
import { Observable } from 'rxjs';
import { ApiUrl } from '../models/urls';

export interface ArtifactListModel {
  name: string;
  lastVersion: string;
  lastUpdateTime: Date;
}

export interface ArtifactVersionListModel {
  name: string;
  version: string;
  lastUpdateTime: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  search(repoCode: string, query: Search): Observable<SearchResult<ArtifactListModel>> {
    return this.http.post<SearchResult<ArtifactListModel>>(ApiUrl.searchArgifact.replace("{repoCode}", repoCode), query, this.httpOptions);
  }

  getDetail(repoCode: string, artifactName: string): Observable<DataResult<ArtifactListModel>> {
    return this.http.get<DataResult<ArtifactListModel>>(ApiUrl.argifactDetails.replace("{repoCode}", repoCode).replace("{argifactName}", artifactName), this.httpOptions);
  }

  getVersions(repoCode: string, artifactName: string, query: Search): Observable<SearchResult<ArtifactVersionListModel>> {
    return this.http.post<SearchResult<ArtifactVersionListModel>>(ApiUrl.argifactVersions.replace("{repoCode}", repoCode).replace("{argifactName}", artifactName), query, this.httpOptions);
  }
}