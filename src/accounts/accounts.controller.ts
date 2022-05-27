import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAccountCommand } from './commands/create-account.command';
import { DepositCommand } from './commands/deposit.command';
import { WithdrawCommand } from './commands/withdraw.command';
import { Account } from './models/account.model';
import { GetAccountQuery } from './queries/get-account.query';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createAccount(@Body() input: { currency: string }): Promise<Account> {
    return this.commandBus.execute(new CreateAccountCommand(input.currency));
  }

  @Post(':id/deposit')
  async deposit(
    @Param('id') accountId: string,
    @Body() input: { amount: number },
  ) {
    return this.commandBus.execute(new DepositCommand(accountId, input.amount));
  }

  @Post(':id/withdraw')
  async withdraw(
    @Param('id') accountId: string,
    @Body() input: { amount: number },
  ) {
    return this.commandBus.execute(
      new WithdrawCommand(accountId, input.amount),
    );
  }

  @Get(':id')
  async balance(@Param('id') accountId: string) {
    return this.queryBus.execute(new GetAccountQuery(accountId));
  }
}
