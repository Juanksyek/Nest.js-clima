import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import fetch from 'node-fetch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly apiUrl: string = 'http://api.openweathermap.org/data/2.5/weather';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY');
    console.log('API Key:', this.apiKey);
  }

  async getWeather(city: string): Promise<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}`;
    console.log('Request URL:', url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new HttpException(errorMessage, response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.response) {
        console.log('Error response:', error.response.data);
        throw new HttpException(error.response.data, error.response.status);
      } else if (error.request) {
        console.log('Error request:', error.request);
        throw new HttpException('No response received from weather API', HttpStatus.SERVICE_UNAVAILABLE);
      } else {
        console.log('Error message:', error.message);
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}