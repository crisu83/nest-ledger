import { Event } from '../../events/event.model';
import { Account } from '../models/account.model';

export type DepositPayload = {
  amount: number;
};

export class DepositEvent<T extends object = DepositPayload> extends Event<T> {
  aggregateName = Account.aggregateName;

  constructor(public readonly aggregateId: string, public readonly payload: T) {
    super();
  }
}
