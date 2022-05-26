import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WithdrawCommand } from './withdraw.command';

@CommandHandler(WithdrawCommand)
export class WithdrawHandler implements ICommandHandler<WithdrawCommand> {
  async execute(command: WithdrawCommand): Promise<void> {
    console.log('WithdrawHandler.execute:', command);
  }
}
