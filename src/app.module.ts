import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WeatherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(){
    console.log('WEATHER_API_KEY:', process.env.WEATHER_API_KEY);
    
  }
}
