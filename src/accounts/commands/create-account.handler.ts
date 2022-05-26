import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from './create-account.command';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  async execute(command: CreateAccountCommand): Promise<void> {
    console.log('CreateAccountHandler.execute:', command);
  }
}
