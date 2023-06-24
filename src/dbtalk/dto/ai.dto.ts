import { ApiProperty } from '@nestjs/swagger';

export class AIPromptDTO {
  @ApiProperty()
  prompt: string;
}

export class TokenDTO {
  @ApiProperty()
  token: string;
}
