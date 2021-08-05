import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface Tag {
    name: string;
    color: string;
    internal: boolean;
    single: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class TagService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient
    ) { }
}