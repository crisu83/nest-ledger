import { Event } from '../../events/event.model';

export type WithdrawPayload = {
  amount: number;
};

export class WithdrawEvent<
  T extends object = WithdrawPayload,
> extends Event<T> {}
