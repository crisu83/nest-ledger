import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountsRepository } from '../accounts-repository';
import { Account } from '../models/account.model';
import { DepositCommand } from './deposit.command';

@CommandHandler(DepositCommand)
export class DepositHandler implements ICommandHandler<DepositCommand> {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DepositCommand): Promise<Account> {
    const account = this.publisher.mergeObjectContext(
      await this.accountsRepository.findOneById(command.accountId),
    );

    account.deposit(command.amount);
    account.commit();

    return account;
  }
}
