import * as pgp from 'pg-promise';
import {
  DynamicModule,
  Global,
  Inject,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';

export const POSTGRES_OPTIONS = 'PosgresOptions';
export const POSTGRES_CONNECTION = 'PostgresConnection';

export type PostgresConnection = pgp.IDatabase<unknown>;
export type PostgresModuleOptions = {
  connection: {
    host: string;
    database: string;
    user: string;
    password: string;
  };
};

const connectionFactory = {
  provide: POSTGRES_CONNECTION,
  useFactory: (options: PostgresModuleOptions) =>
    PostgresModule.createConnection(options),
  inject: [POSTGRES_OPTIONS],
};

@Global()
@Module({})
export class PostgresModule
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(
    @Inject(POSTGRES_CONNECTION)
    private readonly connection: PostgresConnection,
  ) {}

  async onApplicationBootstrap() {
    (await this.connection.connect()).done();
  }

  async onApplicationShutdown() {
    await this.connection.$pool.end();
  }

  static forRoot(options: PostgresModuleOptions): DynamicModule {
    return {
      module: PostgresModule,
      providers: [
        {
          provide: POSTGRES_OPTIONS,
          useValue: options,
        },
        connectionFactory,
      ],
      exports: [connectionFactory],
    };
  }

  static createConnection(options: PostgresModuleOptions) {
    return pgp()(options.connection);
  }
}
