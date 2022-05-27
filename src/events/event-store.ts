import { Injectable } from '@nestjs/common';
import { Event } from './event.model';

@Injectable()
export class EventStore<T extends Event = Event> {
  private readonly events: T[] = [];

  async save(event: T): Promise<void> {
    const prev = (
      await this.findAllByAggregateAndId(event.aggregateName, event.aggregateId)
    ).slice(-1)[0];
    event.version = (prev ? prev.version : 0) + 1;
    this.events.push(event);
    console.log('EventStore.save:', event);
  }

  async findAllByAggregate(
    aggregateName: string,
  ): Promise<Record<string, T[]>> {
    return this.events
      .filter((event) => event.aggregateName === aggregateName)
      .sort((a, b) => a.version - b.version)
      .reduce((acc, event) => {
        if (!acc[event.aggregateId]) acc[event.aggregateId] = [];
        acc[event.aggregateId].push(event);
        return acc;
      }, {});
  }

  async findAllByAggregateAndId(
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
