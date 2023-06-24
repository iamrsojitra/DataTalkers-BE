import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TokenDTO } from 'src/dbtalk/dto/ai.dto';
import { DatabaseService } from './database.service';
import { DatabaseDTO } from './dto/database.dto';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post()
  @ApiOperation({ summary: 'Create your database connection' })
  @ApiBody({ type: DatabaseDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Connection success.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  connectDB(@Body() databaseDTO: DatabaseDTO) {
    return this.databaseService
      .connect(databaseDTO)
      .then(() => this.databaseService.encrypt(JSON.stringify(databaseDTO)));
  }

  @Post('/db-test')
  @ApiOperation({ summary: 'Test Guard' })
  @ApiBody({ type: TokenDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async dbTest(@Body('token') token: string) {
    return {
      token,
      data: await this.databaseService.dtSource.query('select * from student'),
    };
  }
}
