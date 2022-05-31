import { AggregateRoot } from '@nestjs/cqrs';
import { AccountCreatedEvent } from '../events/account-created.event';
import { DepositEvent } from '../events/deposit.event';
import { WithdrawEvent } from '../events/withdraw.event';

export class Account extends AggregateRoot {
  static aggregatePrefix = 'account';

  balance?: number;
  currency?: string;

  get aggregate(): string {
    return Account.createAggregate(this.id);
  }

  constructor(public readonly id: string) {
    super();
  }

  create(currency: string) {
    this.apply(
      AccountCreatedEvent.create({
        type: 'AccountCreatedEvent',
        aggregate: this.aggregate,
        payload: { currency },
      }),
    );
  }

  deposit(amount: number) {
    this.apply(
      DepositEvent.create({
        type: 'DepositEvent',
        aggregate: this.aggregate,
        payload: { amount },
      }),
    );
  }

  withdraw(amount: number) {
    this.apply(
      WithdrawEvent.create({
        type: 'WithdrawEvent',
        aggregate: this.aggregate,
        payload: { amount },
      }),
    );
  }

  onAccountCreatedEvent(event: AccountCreatedEvent) {
    this.balance = 0;
    this.currency = event.payload.currency;
  }

  onDepositEvent(event: DepositEvent) {
    this.balance += +event.payload.amount;
  }

  onWithdrawEvent(event: WithdrawEvent) {
    this.balance -= +event.payload.amount;
  }

  static createAggregate(id: string) {
    return `${Account.aggregatePrefix}:${id}`;
  }
}
