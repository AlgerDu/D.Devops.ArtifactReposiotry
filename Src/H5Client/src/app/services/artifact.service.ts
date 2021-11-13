import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SearchResult, Search, Result, DataResult } from '../models/base';
import { Observable } from 'rxjs';
import { ApiUrl } from '../models/urls';

export interface ArtifactBaseModel {
  repoCode: string;
  name: string;
  lastUpdateTime?: Date;
}

/**
 * 制品搜索
 */
export interface ArtifactSearchModel extends ArtifactBaseModel {
  latestVersion: string;
}

export interface ArtifactListModel extends ArtifactBaseModel {
  version: string;
  tags: string[];
  downloadQuantity: number;
}

export interface DependArtifactModel {
  name: string;
  version: string;
}

export interface DependModel {
  condition: string;
  artifacts: DependArtifactModel[];
}

export interface ArtifactObjectModel {
  name: string;
  downloadQuantity: number;
  tags: string[];
  attributes: { [key: string]: string; };
}

export interface ArtifactModel extends ArtifactBaseModel {
  version: string;
  tags: string[];
  attributes: { [key: string]: string; };
  downloadQuantity: number;
  depends: DependModel[];
  obejcts: ArtifactObjectModel[];
}

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  baseUrl = ApiUrl.base + "/repositorys";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  search(repoCode: string, query: Search)
    : Observable<SearchResult<ArtifactSearchModel>> {
    var url = `${this.baseUrl}/${repoCode}/search`;
    return this.http.post<SearchResult<ArtifactSearchModel>>(url, query, this.httpOptions);
  }

  getVersions(repoCode: string, artifactName: string, query: Search)
    : Observable<SearchResult<ArtifactListModel>> {
    var url = `${this.baseUrl}/${repoCode}/artifacts/${artifactName}/versions`;
    return this.http.post<SearchResult<ArtifactListModel>>(url, query, this.httpOptions);
  }

  getDetail(repoCode: string, artifactName: string, artifactVersion: string)
    : Observable<DataResult<ArtifactModel>> {
    var url = `${this.baseUrl}/${repoCode}/artifacts/${artifactName}/v/${artifactVersion}`;
    return this.http.get<DataResult<ArtifactModel>>(url, this.httpOptions);
  }
}