import { Event } from '../../events/event.model';

export type DepositPayload = {
  amount: number;
};

export class DepositEvent<T extends object = DepositPayload> extends Event<T> {}
