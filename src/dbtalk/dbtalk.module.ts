import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';

@Module({
  imports: [HttpModule],
  providers: [AIService, HttpModule],
  controllers: [AIController],
  exports: [HttpModule],
})
export class DbtalkModule {}
