import { IEvent } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

export abstract class Event<T extends object = any> implements IEvent {
  readonly id = uuid();
  readonly type = this.constructor.name;

  abstract aggregateName: string;
  abstract aggregateId: string;

  version: number;
  payload: T;
}
