import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
    description:
      'If connection done successfully then it will return accessToken',
    schema: {
      example: {
        accessToken: '<access_token>',
      },
    },
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  connectDB(@Body() databaseDTO: DatabaseDTO) {
    return this.databaseService
      .connect(databaseDTO)
      .then(() => {
        return {
          accessToken: this.databaseService.encrypt(
            JSON.stringify(databaseDTO),
          ),
        };
      })
      .catch(() => {
        throw new HttpException(
          {
            message: 'Invalid Database Credentials',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
