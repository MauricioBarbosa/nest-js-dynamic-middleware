import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChroniclesModule } from './chronicles/chronicles.module';

@Module({
  imports: [ChroniclesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
