import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DepositCommand } from './deposit.command';

@CommandHandler(DepositCommand)
export class DepositHandler implements ICommandHandler<DepositCommand> {
  async execute(command: DepositCommand): Promise<void> {
    console.log('DepositHandler.execute:', command);
  }
}
