import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [AIService, HttpModule],
  controllers: [AIController],
  exports: [HttpModule],
})
export class DbtalkModule {}
