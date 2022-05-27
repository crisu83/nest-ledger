import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountsRepository } from '../accounts-repository';
import { Account } from '../models/account.model';
import { FindAccountsQuery } from './find-accounts.query';

@QueryHandler(FindAccountsQuery)
export class FindAccountsHandler implements IQueryHandler<FindAccountsQuery> {
  constructor(private readonly repository: AccountsRepository) {}

  async execute(): Promise<Account[]> {
    return this.repository.findAll();
  }
}
