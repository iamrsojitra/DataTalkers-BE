import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private databaseService: DatabaseService) {}

  use(req: Request, _: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new HttpException(
        {
          message: 'Token is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      throw new HttpException(
        {
          message: 'Token is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const tokenData = this.databaseService.decrypt(token);
    this.databaseService
      .connect(JSON.parse(tokenData))
      .then((dtSource) => {
        if (this.databaseService.dtSource) {
          this.databaseService.dtSource.destroy();
        }
        this.databaseService.dtSource = dtSource;
        next();
      })
      .catch((e) => {
        console.log(e);
        throw new HttpException(
          {
            message: 'Invalid Database Credentials',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
