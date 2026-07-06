import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecast, WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather implements OnInit {
  forecasts: WeatherForecast[] = [];
  loading = signal(false);
  error = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loadForecasts();
  }

  loadForecasts(): void {
    this.loading.set(true);
    this.error = '';
    this.weatherService.getForecasts().subscribe({
      next: (data) => {
        this.forecasts = data;
        this.loading.set(false);
      },
      error: () => {
        this.error = 'Unable to load weather data. Please try again later.';
        this.loading.set(false);
      },
    }); 
  }

  refresh(): void {
    this.loadForecasts();
  }
}
