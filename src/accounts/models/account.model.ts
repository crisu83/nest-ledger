import { AggregateRoot } from '@nestjs/cqrs';
import { AccountCreatedEvent } from '../events/account-created.event';
import { DepositEvent } from '../events/deposit.event';
import { WithdrawEvent } from '../events/withdraw.event';

export class Account extends AggregateRoot {
  static aggregateName = 'account';

  balance = 0;
  currency?: string;

  constructor(public readonly id: string) {
    super();
  }

  create(currency: string) {
    this.apply(new AccountCreatedEvent(this.id, currency));
  }

  deposit(amount: number) {
    this.apply(new DepositEvent(this.id, amount));
  }

  withdraw(amount: number) {
    this.apply(new WithdrawEvent(this.id, amount));
  }

  onAccountCreatedEvent(event: AccountCreatedEvent) {
    this.currency = event.currency;
  }

  onDepositEvent(event: DepositEvent) {
    this.balance += +event.amount;
  }

  onWithdrawEvent(event: WithdrawEvent) {
    this.balance -= +event.amount;
  }
}
