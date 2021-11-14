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
 * 制品的唯一标识；用于制品的删除、修改等等
 */
export interface ArtifactSymbol {
  repoCode: string;
  name: string;
  version: string;
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

export interface ArtifactModel extends ArtifactSymbol {
  version: string;
  tags: string[];
  attributes: { [key: string]: string; };
  downloadQuantity: number;
  depends: DependModel[];
  obejcts: ArtifactObjectModel[];
  lastUpdateTime?: Date;
}

export interface ArtifactUpdateDTO {
  depends: DependModel[];
  tags: string[];
  attributes: { [key: string]: string; };
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

  /**
   * 查询仓库下的制品
   * @param repoCode 仓库编号
   * @param query 查询条件
   * @returns 符合条件的制品列表
   */
  search(repoCode: string, query: Search)
    : Observable<SearchResult<ArtifactSearchModel>> {
    var url = `${this.baseUrl}/${repoCode}/search`;
    return this.http.post<SearchResult<ArtifactSearchModel>>(url, query, this.httpOptions);
  }

  /**
   * 获取制品的版本列表
   * @param repoCode 仓库编号
   * @param artifactName 制品名称
   * @param query 查询条件
   * @returns 制品的版本列表
   */
  getVersions(repoCode: string, artifactName: string, query: Search)
    : Observable<SearchResult<ArtifactListModel>> {
    var url = `${this.baseUrl}/${repoCode}/artifacts/${artifactName}/versions`;
    return this.http.post<SearchResult<ArtifactListModel>>(url, query, this.httpOptions);
  }

  /**
   * 获取制品某一版本的详细信息
   * @param repoCode 仓库编号
   * @param artifactName 制品名称
   * @param artifactVersion 制品版本
   * @returns 相信信息
   */
  getDetail(repoCode: string, artifactName: string, artifactVersion: string)
    : Observable<DataResult<ArtifactModel>> {
    var url = `${this.baseUrl}/${repoCode}/artifacts/${artifactName}/v/${artifactVersion}`;
    return this.http.get<DataResult<ArtifactModel>>(url, this.httpOptions);
  }

  /**
   * 更新制品的一些可编辑信息
   * @param artifact 
   * @param data 
   * @returns 
   */
  update(artifact: ArtifactSymbol, data: ArtifactUpdateDTO)
    : Observable<Result> {
    var url = `${this.baseUrl}/${artifact.repoCode}/artifacts/${artifact.name}/v/${artifact.version}`;
    return this.http.put<Result>(url, data, this.httpOptions);
  }
}