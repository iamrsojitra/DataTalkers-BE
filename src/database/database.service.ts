import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import {
  createCipheriv,
  createDecipheriv,
  pbkdf2Sync,
  randomBytes,
} from 'crypto';
import { DatabaseDTO } from './dto/database.dto';

@Injectable()
export class DatabaseService {
  algorithm = 'aes-256-cbc';
  secretKey = pbkdf2Sync(process.env.SECRET_KEY, 'salt', 100000, 32, 'sha256');
  iv = randomBytes(16); // Initialization Vector
  dtSource: DataSource;

  encrypt(text) {
    const cipher = createCipheriv(this.algorithm, this.secretKey, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${this.iv.toString('hex')}:${encrypted}`;
  }

  decrypt(text) {
    const [ivString, encryptedText] = text.split(':');
    const decipher = createDecipheriv(
      this.algorithm,
      this.secretKey,
      Buffer.from(ivString, 'hex'),
    );
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  connect(databaseDTO: DatabaseDTO) {
    try {
      const AppDataSource = new DataSource({
        type: 'mysql',
        ...databaseDTO,
      });
      return AppDataSource.initialize();
    } catch (error) {
      throw new HttpException(
        {
          message: 'Invalid Database Credentials',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
