import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Event {
  code: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  subscribe(codes: string | string[]): string {
    return "";
  }

  unsubscribe(key: string) {

  }

  publish(event: Event) {

  }

}
