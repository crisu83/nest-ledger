import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventPublisher } from './event-publisher';
import { EventStore } from './event-store';
import { EventsService } from './events.service';

@Module({
  imports: [CqrsModule],
  providers: [EventsService, EventPublisher, EventStore],
  exports: [EventStore],
})
export class EventsModule {}
