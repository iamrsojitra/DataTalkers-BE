import { ApiProperty } from '@nestjs/swagger';

export class AIPromptDTO {
  @ApiProperty()
  prompt: string;
}
