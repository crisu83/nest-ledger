import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BalanceQuery } from './balance.query';
import { DepositCommand } from './deposit.command';
import { WithdrawCommand } from './withdraw.command';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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
