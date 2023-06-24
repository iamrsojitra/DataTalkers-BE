import { ApiProperty } from '@nestjs/swagger';

export class DatabaseDTO {
  @ApiProperty()
  host: string;

  @ApiProperty()
  port: number;

  @ApiProperty()
  user: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  database: string;
}
