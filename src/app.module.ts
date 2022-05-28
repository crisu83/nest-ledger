import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { EventsModule } from './events/events.module';
import { PostgresModule } from './postgres/postgres.module';

@Module({
  imports: [
    AccountsModule,
    EventsModule,
    PostgresModule.forRoot({
      connection: {
        host: 'localhost',
        database: 'postgres',
        user: 'postgres',
        password: 'postgres',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
