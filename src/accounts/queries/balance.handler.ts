import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BalanceQuery } from './balance.query';

@QueryHandler(BalanceQuery)
export class BalanceHandler implements IQueryHandler<BalanceQuery> {
  async execute(query: BalanceQuery): Promise<number> {
    console.log('BalanceHandler.execute:', query);
    return 100;
  }
}
