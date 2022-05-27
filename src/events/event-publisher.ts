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
    console.log('EventPublisher.publish:', event);

    this.eventStore.save(event as unknown as Event);
  }

  publishAll?<T extends EventBase>(events: T[]) {
    console.log('EventPublisher.publishAll:', events);

    (events ?? []).forEach((event) => this.publish(event));
  }
}
