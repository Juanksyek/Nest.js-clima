import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
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
      const response = await axios.get(url);

      if (response && response.data) {
        return response.data;
      } else {
        throw new HttpException('Invalid response from weather API', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      } else if (error.request) {
        throw new HttpException('No response received from weather API', HttpStatus.SERVICE_UNAVAILABLE);
      } else {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
