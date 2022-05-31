import { Inject, Injectable } from '@nestjs/common';
import { AccountCreatedEvent } from '../accounts/events/account-created.event';
import { DepositEvent } from '../accounts/events/deposit.event';
import { WithdrawEvent } from '../accounts/events/withdraw.event';
import {
  PostgresConnection,
  POSTGRES_CONNECTION,
} from '../postgres/postgres.module';
import { Event } from './event.model';

type EventRecord = {
  id: string;
  type: string;
  aggregate: string;
  version: number;
  payload: object;
};

@Injectable()
export class EventStore<T extends Event = Event> {
  constructor(
    @Inject(POSTGRES_CONNECTION)
    private readonly connection: PostgresConnection,
  ) {}

  async save(event: T): Promise<Event> {
    const result = await this.connection.task(async (t) => {
      const { prev } = await t.oneOrNone<{ prev: number }>(
        `SELECT MAX(version) as prev FROM events WHERE aggregate = $<aggregate>`,
        event,
      );

      const version = (prev ? +prev : 0) + 1;

      return await t.one<Event>(
        `
        INSERT INTO events (type, aggregate, version, payload)
          VALUES ($<type>, $<aggregate>, $<version>, $<payload>)
          RETURNING *;
        `,
        { ...event, version },
      );
    });

    console.log('EventStore.save:', event, result);

    return result;
  }

  async findAllByAggregate(aggregate: string): Promise<T[]> {
    const records = await this.connection.manyOrNone(
      `
      SELECT * FROM events 
        WHERE aggregate = $<aggregate> 
        ORDER BY version ASC
      `,
      { aggregate },
    );

    return records.map(eventFactory) as T[];
  }

  async findAllByAggregatePrefix(
    aggregatePrefix: string,
  ): Promise<Record<string, T[]>> {
    throw new Error('Not implemented');
  }
}

function eventFactory(record: EventRecord) {
  switch (record.type) {
    case 'AccountCreatedEvent':
      return AccountCreatedEvent.create(record);
    case 'DepositEvent':
      return DepositEvent.create(record);
    case 'WithdrawEvent':
      return WithdrawEvent.create(record);
    default:
      throw new Error(`Unknown event type: ${record.type}`);
  }
}
