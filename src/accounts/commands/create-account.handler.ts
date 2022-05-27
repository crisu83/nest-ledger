import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';
import { Account } from '../models/account.model';
import { CreateAccountCommand } from './create-account.command';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(private readonly publisher: EventPublisher) {}

  async execute(command: CreateAccountCommand): Promise<Account> {
    const account = this.publisher.mergeObjectContext(new Account(uuid()));

    account.create(command.currency);
    account.commit();

    return account;
  }
}
