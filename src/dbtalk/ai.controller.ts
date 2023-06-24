import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { AIService } from './ai.service';
import { AIPromptDTO } from './dto/ai.dto';

@ApiBearerAuth()
@Controller('ai')
export class AIController {
  constructor(private readonly aIService: AIService) {}

  @Post()
  @ApiOperation({ summary: 'Ask Question to AI' })
  @ApiBody({ type: AIPromptDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        result: ' There are 7 students with a grade of A.',
        sql: " SELECT COUNT(*) FROM `student` WHERE grade = 'A';",
      },
    },
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  generateResponse(@Body('prompt') prompt: string) {
    return this.aIService.generateResponse(prompt);
  }
}
