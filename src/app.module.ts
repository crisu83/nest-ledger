import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [AccountsModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
