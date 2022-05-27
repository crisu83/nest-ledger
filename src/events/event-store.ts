import { Injectable } from '@nestjs/common';
import { Event } from './event.model';

@Injectable()
export class EventStore<T extends Event = Event> {
  private readonly events: T[] = [];

  async save(event: T): Promise<void> {
    const prev = (
      await this.findAllForAggregate(event.aggregateName, event.aggregateId)
    ).slice(-1)[0];

    event.version = (prev ? prev.version : 0) + 1;

    this.events.push(event);

    console.log('EventStore.save:', event);
  }

  async findAllForAggregate(
    aggregateName: string,
    aggregateId: string,
  ): Promise<T[]> {
    return this.events
      .filter(
        (event) =>
          event.aggregateName === aggregateName &&
          event.aggregateId === aggregateId,
      )
      .sort((a, b) => a.version - b.version);
  }
}
