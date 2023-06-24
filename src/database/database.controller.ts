import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
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
  generateResponse(@Body() databaseDTO: DatabaseDTO) {
    return this.databaseService
      .connect(databaseDTO)
      .pipe(map((response: AxiosResponse) => response));
  }
}
