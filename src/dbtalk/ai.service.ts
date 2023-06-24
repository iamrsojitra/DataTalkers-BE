import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SqlDatabaseChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { SqlDatabase } from 'langchain/sql_db';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AIService {
  apiKey: string;
  apiUrl: string;
  constructor(
    private readonly httpService: HttpService,
    private databaseService: DatabaseService,
  ) {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.apiUrl = 'https://api.openai.com/v1/completions';
  }

  async generateResponse(prompt: string) {
    const db = await SqlDatabase.fromDataSourceParams({
      appDataSource: this.databaseService.dtSource,
    });

    const chain = new SqlDatabaseChain({
      llm: new OpenAI({ temperature: 0 }),
      database: db,
      sqlOutputKey: 'sql',
    });

    const res = await chain.call({ query: prompt });
    return res;
  }
}
