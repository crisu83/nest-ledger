import { Event } from '../../events/event.model';

export type AccountCreatedPayload = {
  currency: string;
};

export class AccountCreatedEvent<
  T extends object = AccountCreatedPayload,
> extends Event<T> {}
