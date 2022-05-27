import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventPublisher } from './event-publisher';

@Injectable()
export class EventsService implements OnModuleInit {
  constructor(
    private eventBus: EventBus,
    private eventPublisher: EventPublisher,
  ) {}

  onModuleInit() {
    // Replace the default EventPublisher with our own
    // which persists the events using the EventStore.
    this.eventBus.publisher = this.eventPublisher;
  }
}
