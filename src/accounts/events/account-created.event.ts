import { Event } from '../../events/event.model';
import { Account } from '../models/account.model';

export type AccountCreatedPayload = {
  currency: string;
};

export class AccountCreatedEvent<
  T extends object = AccountCreatedPayload,
> extends Event<T> {
  aggregateName = Account.aggregateName;

  constructor(public readonly aggregateId: string, public readonly payload: T) {
    super();
  }
}
