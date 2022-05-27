import { Event } from '../../events/event.model';
import { Account } from '../models/account.model';

export type WithdrawPayload = {
  amount: number;
};

export class WithdrawEvent<
  T extends object = WithdrawPayload,
> extends Event<T> {
  aggregateName = Account.aggregateName;

  constructor(public readonly aggregateId: string, public readonly payload: T) {
    super();
  }
}
