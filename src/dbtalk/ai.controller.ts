import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AIService } from './ai.service';
import { AIPromptDTO } from './dto/ai.dto';

@Controller('ai')
export class AIController {
  constructor(private readonly aIService: AIService) {}

  @Post()
  @ApiOperation({ summary: 'Ask Question to AI' })
  @ApiBody({ type: AIPromptDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  generateResponse(@Body('prompt') prompt: string) {
    return { hi: 'hello' };
    // return this.aIService
    //   .generateResponse(prompt)
    //   .pipe(map((response: AxiosResponse) => response));
  }
  // response.data.choices[0].text.trim()
}
