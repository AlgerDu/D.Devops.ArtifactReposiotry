import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

  handlers: { [key: string]: Subject<DEvent> };

  constructor() {
    this.handlers = {};
  }

  subscribe(code: string): Subject<DEvent> {

    if (this.handlers[code] == null) {
      this.handlers[code] = new Subject<DEvent>();
    }

    return this.handlers[code];
  }

  publish(devent: DEvent) {
    if (devent.code == null || devent.code == "") {
      return;
    }

    if (this.handlers[devent.code] == null) {
      return;
    }

    this.handlers[devent.code].next(devent);
  }

}
