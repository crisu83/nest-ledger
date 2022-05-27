import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventsModule } from '../events/events.module';
import { AccountsRepository } from './accounts-repository';
import { AccountsController } from './accounts.controller';
import { CreateAccountHandler } from './commands/create-account.handler';
import { DepositHandler } from './commands/deposit.handler';
import { WithdrawHandler } from './commands/withdraw.handler';
import { FindAccountsHandler } from './queries/find-accounts.handler';
import { GetAccountHandler } from './queries/get-account.handler';

const CommandHandlers = [CreateAccountHandler, DepositHandler, WithdrawHandler];
const QueryHandlers = [FindAccountsHandler, GetAccountHandler];

@Module({
  imports: [CqrsModule, EventsModule],
  controllers: [AccountsController],
  providers: [AccountsRepository, ...CommandHandlers, ...QueryHandlers],
})
export class AccountsModule {}
