import { Injectable } from '@nestjs/common';
import { IEvent, IEventPublisher } from '@nestjs/cqrs';
import { Event } from './event.model';
import { EventStore } from './event-store';

@Injectable()
export class EventPublisher<EventBase extends IEvent = IEvent>
  implements IEventPublisher<EventBase>
{
  constructor(private readonly eventStore: EventStore) {}

  publish<T extends EventBase>(event: T) {
    this.eventStore.save(event as unknown as Event);
  }

  publishAll?<T extends EventBase>(events: T[]) {
    (events ?? []).forEach((event) => this.publish(event));
  }
}
