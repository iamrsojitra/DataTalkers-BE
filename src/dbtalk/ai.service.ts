import { Injectable } from '@nestjs/common';
import { SqlDatabaseChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { SqlDatabase } from 'langchain/sql_db';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AIService {
  constructor(private databaseService: DatabaseService) {}

  async generateResponse(prompt: string) {
    const allTables = await this.databaseService.dtSource.query('show tables;');

    const db = await SqlDatabase.fromDataSourceParams({
      appDataSource: this.databaseService.dtSource,
      includesTables: allTables.map((tbl) => Object.values(tbl)[0]),
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
