import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAccountCommand } from './commands/create-account.command';
import { DepositCommand } from './commands/deposit.command';
import { WithdrawCommand } from './commands/withdraw.command';
import { BalanceQuery } from './queries/balance.query';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createAccount() {
    return this.commandBus.execute(new CreateAccountCommand());
  }

  @Post(':id/deposit')
  async deposit(
    @Param('id') accountId: string,
    @Body() { amount }: { amount: number },
  ) {
    return this.commandBus.execute(new DepositCommand(accountId, amount));
  }

  @Post(':id/withdraw')
  async withdraw(
    @Param('id') accountId: string,
    @Body() { amount }: { amount: number },
  ) {
    return this.commandBus.execute(new WithdrawCommand(accountId, amount));
  }

  @Get(':id/balance')
  async balance(@Param('id') accountId: string) {
    return this.queryBus.execute(new BalanceQuery(accountId));
  }
}
