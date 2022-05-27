import { IEvent } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

export abstract class Event implements IEvent {
  readonly id = uuid();
  readonly type: string;
  abstract aggregateName: string;
  abstract aggregateId: string;
  version: number;

  constructor() {
    this.type = this.constructor.name;
  }
}
