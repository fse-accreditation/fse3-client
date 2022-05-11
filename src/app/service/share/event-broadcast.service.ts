import { Injectable } from '@angular/core';
import {EventType} from '../../entity/eventType'
import {BroadcastEvent} from '../../entity/broadcastEvent'
import { Observable,Subject } from 'rxjs';
import { filter } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class EventBroadcastService {

  private eventBrocker = new Subject<BroadcastEvent<any>>();
  constructor() { }
  on(eventType: EventType): Observable<BroadcastEvent<any>> {
    return this.eventBrocker.pipe(filter((event:any) => event.type === eventType));
  }
  dispatch<T>(event: BroadcastEvent<T>): void {
    this.eventBrocker.next(event);
  }
}
