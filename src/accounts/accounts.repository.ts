import { Injectable } from '@nestjs/common';
import { EventStore } from '../events/event-store';
import { Event } from '../events/event.model';
import { Account } from './models/account.model';

@Injectable()
export class AccountsRepository {
  constructor(private readonly eventStore: EventStore) {}

  async findOneById(id: string): Promise<Account> {
    const aggregate = Account.createAggregate(id);
    const events = await this.eventStore.findAllByAggregate(aggregate);
    return this.load(id, events);
  }

  async findAll(): Promise<Account[]> {
    const eventsByAggregate = await this.eventStore.findAllByAggregatePrefix(
      Account.aggregatePrefix,
    );
    return Array.from(Object.entries(eventsByAggregate), ([id, events]) =>
      this.load(id, events),
    );
  }

  private load(id: string, events: Event[]): Account {
    const model = new Account(id);
    model.loadFromHistory(events); // apply the events to the model
    return model;
  }
}
