import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DEvent {
  code: string;
  data: any;
}

export interface DEventHandleFunction {
  (devent: DEvent): void;
}
export interface DEventHandler {
  code: string;
  handle: DEventHandleFunction;
}

class DEventHandlerCache implements DEventHandler {
  key: string;
  code: string;
  handle: DEventHandleFunction;

  constructor(key: string, handler: DEventHandler) {
    this.key = key;
    this.code = handler.code;
    this.handle = handler.handle;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DEventService {

  key: number;
  handlers: { [key: string]: DEventHandlerCache[]; };

  constructor() {
    this.key = 0;
    this.handlers = {};
  }

  subscribe(handlers: DEventHandler[]): string {

    if (handlers == null || handlers.length == 0) {
      return "";
    }

    this.key++;
    var key = this.key.toString();

    handlers.forEach((v, i) => {

      if (this.handlers[v.code]==null){
        this.handlers[v.code] = [];
      }

      this.handlers[v.code].push(new DEventHandlerCache(key, v));
    });

    return key;
  }

  unsubscribe(key: string) {
    if (key == null || key == "") {
      return;
    }

    for (let k in this.handlers) {
      this.handlers[k] = this.handlers[k].filter(ii => ii.key != key);
    }
  }

  publish(devent: DEvent) {
    if (devent.code == null || devent.code == "") {
      return;
    }

    this.handlers[devent.code].forEach((v, i) => {
      v.handle(devent);
    });
  }

}
