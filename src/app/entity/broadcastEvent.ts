import {EventType} from './eventType'
export class BroadcastEvent<T> {
    constructor(
      public type: EventType,
      public payload: T,
    ) {}
  }