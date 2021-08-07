import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiUrl } from '../models/urls';

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

    caches: { [key: string]: Tag } = {};

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient
    ) { }

    getTag(name: string): Observable<Tag> {
        if (this.caches[name] != null) {
            return of(this.caches[name]);
        }

        return this.http.get<Tag>(ApiUrl.getTag.replace("{name}", name))
            .pipe(
                tap(
                    tag => {

                        if (tag == null){
                            tag = {
                                color: "default",
                                name: name,
                                internal: false,
                                single: false
                            };
                        }

                        this.caches[name] = tag;
                    }
                )
            );
    }

}