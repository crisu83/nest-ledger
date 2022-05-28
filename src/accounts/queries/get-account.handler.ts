import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountsRepository } from '../accounts.repository';
import { Account } from '../models/account.model';
import { GetAccountQuery } from './get-account.query';

@QueryHandler(GetAccountQuery)
export class GetAccountHandler implements IQueryHandler<GetAccountQuery> {
  constructor(private readonly repository: AccountsRepository) {}

  async execute(query: GetAccountQuery): Promise<Account> {
    return this.repository.findOneById(query.accountId);
  }
}
