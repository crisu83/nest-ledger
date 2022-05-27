import { Event } from '../../events/event.model';
import { Account } from '../models/account.model';

export class DepositEvent extends Event {
  aggregateName = Account.aggregateName;

  constructor(
    public readonly aggregateId: string,
    public readonly amount: number,
  ) {
    super();
  }
}
