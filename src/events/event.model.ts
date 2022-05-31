import { IEvent } from '@nestjs/cqrs';

type EventProps<T extends object> = {
  id?: string;
  type?: string;
  aggregate: string;
  version?: number;
  payload?: T;
};

export class Event<T extends object = any> implements IEvent {
  readonly id: string;
  readonly type: string;
  readonly aggregate: string;
  readonly version?: number;
  readonly payload?: T;

  protected constructor(
    id: string,
    type: string,
    aggregate: string,
    version?: number,
    payload?: T,
  ) {
    this.id = id;
    this.type = type;
    this.aggregate = aggregate;
    this.version = version;
    this.payload = payload;
  }

  static create<T extends object = any>(props: EventProps<T>): Event {
    return new this(
      props.id,
      props.type,
      props.aggregate,
      props.version,
      props.payload,
    );
  }
}
