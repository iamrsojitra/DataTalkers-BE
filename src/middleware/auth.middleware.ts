import { Injectable, NestMiddleware } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private databaseService: DatabaseService) {}

  use(req: any, _: any, next: () => void) {
    const token = req.body.token.split(' ')[1];
    if (!token) {
      throw new Error('Token is required');
    }
    const tokenData = this.databaseService.decrypt(token);
    this.databaseService
      .connect(JSON.parse(tokenData))
      .then((dtSource) => {
        this.databaseService.dtSource = dtSource;
        next();
      })
      .catch((e) => {
        console.log(e);
        throw new Error('Token is required');
      });
  }
}
