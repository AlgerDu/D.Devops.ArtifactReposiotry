import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SearchResult, Search, Result, DataResult } from '../models/base';
import { Observable } from 'rxjs';
import { ApiUrl } from '../models/urls';

export interface ArtifactRepoSearchModel {
  repoCode:string;
  name: string;
  latestVersion: string;
  lastUpdateTime?: Date;
}

export interface ArtifactSearchModel {
  repoCode:string;
  name: string;
  version: string;
  tags:string[];
  attributes: { [key: string]: string; } ;
  downloadQuantity:number;
  lastUpdateTime?: Date;
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

  search(repoCode: string, query: Search): Observable<SearchResult<ArtifactRepoSearchModel>> {
    return this.http.post<SearchResult<ArtifactRepoSearchModel>>(ApiUrl.searchArgifact.replace("{repoCode}", repoCode), query, this.httpOptions);
  }

  getDetail(repoCode: string, artifactName: string): Observable<DataResult<ArtifactVersionListModel>> {
    return this.http.get<DataResult<ArtifactVersionListModel>>(ApiUrl.argifactDetails.replace("{repoCode}", repoCode).replace("{argifactName}", artifactName), this.httpOptions);
  }

  getVersions(repoCode: string, artifactName: string, query: Search): Observable<SearchResult<ArtifactSearchModel>> {
    return this.http.post<SearchResult<ArtifactSearchModel>>(ApiUrl.argifactVersions.replace("{repoCode}", repoCode).replace("{argifactName}", artifactName), query, this.httpOptions);
  }
}