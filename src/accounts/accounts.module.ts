import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountsController } from './accounts.controller';
import { DepositHandler } from './commands/deposit.handler';
import { WithdrawHandler } from './commands/withdraw.handler';
import { BalanceHandler } from './queries/balance.handler';

const CommandHandlers = [DepositHandler, WithdrawHandler];
const QueryHandlers = [BalanceHandler];

@Module({
  imports: [CqrsModule],
  controllers: [AccountsController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class AccountsModule {}
