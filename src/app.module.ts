import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsController } from './accounts/accounts.controller';
import { DepositHandler } from './accounts/deposit.handler';
import { WithdrawHandler } from './accounts/withdraw.handler';
import { BalanceHandler } from './accounts/balance.handler';

const CommandHandlers = [DepositHandler, WithdrawHandler];
const QueryHandlers = [BalanceHandler];

@Module({
  imports: [CqrsModule],
  controllers: [AppController, AccountsController],
  providers: [AppService, ...CommandHandlers, ...QueryHandlers],
})
export class AppModule {}
