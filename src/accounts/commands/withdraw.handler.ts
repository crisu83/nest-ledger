import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountsRepository } from '../accounts.repository';
import { Account } from '../models/account.model';
import { WithdrawCommand } from './withdraw.command';

@CommandHandler(WithdrawCommand)
export class WithdrawHandler implements ICommandHandler<WithdrawCommand> {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: WithdrawCommand): Promise<Account> {
    const account = this.publisher.mergeObjectContext(
      await this.accountsRepository.findOneById(command.accountId),
    );

    account.withdraw(command.amount);
    account.commit();

    return account;
  }
}
