import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';
import { AccountCreatedEvent } from '../events/account-created.event';
import { Account } from '../models/account.model';
import { CreateAccountCommand } from './create-account.command';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: CreateAccountCommand): Promise<Account> {
    const account = new Account(uuid());
    const event = new AccountCreatedEvent(account.id, command.currency);

    this.eventBus.publish(event);

    return account;
  }
}
