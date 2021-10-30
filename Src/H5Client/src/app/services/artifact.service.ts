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

export interface ArtifactStaticModel extends ArtifactBaseModel {
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

export interface ArtifactRepoSearchModel {
  repoCode: string;
  name: string;
  latestVersion: string;
  lastUpdateTime?: Date;
}

export interface ArtifactSearchModel {
  repoCode: string;
  name: string;
  version: string;
  tags: string[];
  attributes: { [key: string]: string; };
  downloadQuantity: number;
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

  baseUrl = ApiUrl.base + "/repositorys/{repoCode}/artifacts";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  search(repoCode: string, query: Search): Observable<SearchResult<ArtifactSearchModel>> {
    return this.http.post<SearchResult<ArtifactSearchModel>>(this.baseUrl.replace("{repoCode}", repoCode) + "/search", query, this.httpOptions);
  }

  getDetail(repoCode: string, artifactName: string): Observable<DataResult<ArtifactVersionListModel>> {
    return this.http.get<DataResult<ArtifactVersionListModel>>(ApiUrl.argifactDetails.replace("{repoCode}", repoCode).replace("{argifactName}", artifactName), this.httpOptions);
  }

  getVersions(repoCode: string, artifactName: string, query: Search): Observable<SearchResult<ArtifactSearchModel>> {
    return this.http.post<SearchResult<ArtifactSearchModel>>(ApiUrl.argifactVersions.replace("{repoCode}", repoCode).replace("{argifactName}", artifactName), query, this.httpOptions);
  }
}