import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsController } from './accounts/accounts.controller';
import { DepositHandler } from './accounts/deposit.handler';
import { WithdrawHandler } from './accounts/withdraw.handler';

export const CommandHandlers = [DepositHandler, WithdrawHandler];

@Module({
  imports: [CqrsModule],
  controllers: [AppController, AccountsController],
  providers: [AppService, ...CommandHandlers],
})
export class AppModule {}
