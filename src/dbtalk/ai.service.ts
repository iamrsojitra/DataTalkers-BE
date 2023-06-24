import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class AIService {
  apiKey: string;
  apiUrl: string;
  constructor(private readonly httpService: HttpService) {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.apiUrl = 'https://api.openai.com/v1/completions';
  }

  generateResponse(prompt: string): Observable<AxiosResponse> {
    const data = {
      prompt: prompt,
      model: 'text-davinci-003',
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:'],
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    return this.httpService.post(this.apiUrl, data, { headers: headers });
  }
}
