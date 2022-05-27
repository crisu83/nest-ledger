import { Injectable } from '@nestjs/common';
import { EventStore } from '../events/event-store';
import { Account } from './models/account.model';

@Injectable()
export class AccountsRepository {
  constructor(private readonly eventStore: EventStore) {}

  async findOneById(id: string): Promise<Account> {
    const model = new Account(id);
    const events = await this.eventStore.findAllForAggregate(
      Account.aggregateName,
      id,
    );
    model.loadFromHistory(events); // apply the events to the model
    return model;
  }
}
