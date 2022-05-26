import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountsController } from './accounts.controller';
import { BalanceHandler } from './balance.handler';
import { DepositHandler } from './deposit.handler';
import { WithdrawHandler } from './withdraw.handler';

const CommandHandlers = [DepositHandler, WithdrawHandler];
const QueryHandlers = [BalanceHandler];

@Module({
  imports: [CqrsModule],
  controllers: [AccountsController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class AccountsModule {}
