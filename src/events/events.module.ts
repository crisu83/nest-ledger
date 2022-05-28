import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { EventPublisher } from './event-publisher';
import { EventStore } from './event-store';

@Module({
  imports: [CqrsModule],
  providers: [EventPublisher, EventStore],
  exports: [EventStore],
})
export class EventsModule implements OnApplicationBootstrap {
  constructor(
    private eventBus: EventBus,
    private eventPublisher: EventPublisher,
  ) {}

  onApplicationBootstrap() {
    // Replace the default EventPublisher with our own
    // which persists the events using the EventStore.
    this.eventBus.publisher = this.eventPublisher;
  }
}
