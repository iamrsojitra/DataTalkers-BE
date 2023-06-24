import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DatabaseDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  host: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  database: string;
}
