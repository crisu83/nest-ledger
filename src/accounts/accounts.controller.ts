import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DepositCommand } from './deposit.command';
import { WithdrawCommand } from './withdraw.command';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly commandBus: CommandBus, // private readonly queryBus: QueryBus,
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

  // async balance(accountId: string) {
  //   return this.queryBus.execute(new BalanceQuery(accountId));
  // }
}
