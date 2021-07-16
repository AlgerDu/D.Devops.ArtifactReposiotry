import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SearchResult, Search } from '../models/base';
import { Observable } from 'rxjs';
import { ApiUrl } from '../models/urls';

export interface ArtifactListModel {
    name: string;
    lastVersion: string;
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
  
    search(repoCode:string,query:Search):Observable<SearchResult<ArtifactListModel>>{
      return this.http.post<SearchResult<ArtifactListModel>>(ApiUrl.searchArgifact.replace("{repoCode}",repoCode),query,this.httpOptions);
    }
  }