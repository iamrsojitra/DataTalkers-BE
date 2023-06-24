import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createConnection } from 'mysql2';
import { Observable, of } from 'rxjs';
import { DatabaseDTO } from './dto/database.dto';

@Injectable()
export class DatabaseService {
  connect(databaseDTO: DatabaseDTO): Observable<any> {
    const connection = createConnection(databaseDTO);

    connection.connect((a) => {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: a.message,
        },
        HttpStatus.FORBIDDEN,
      );
    });
    return of(databaseDTO);
  }
}
