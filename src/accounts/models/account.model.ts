import { AggregateRoot } from '@nestjs/cqrs';
import { DepositEvent } from '../events/deposit.event';
import { WithdrawEvent } from '../events/withdraw.event';

export class Account extends AggregateRoot {
  static aggregateName = 'account';

  public balance = 0;

  constructor(public readonly id: string) {
    super();
  }

  deposit(amount: number) {
    this.apply(new DepositEvent(this.id, amount));
  }

  withdraw(amount: number) {
    this.apply(new WithdrawEvent(this.id, amount));
  }

  onDepositEvent(event: DepositEvent) {
    this.balance += +event.amount;
  }

  onWithdrawEvent(event: WithdrawEvent) {
    this.balance -= +event.amount;
  }
}
