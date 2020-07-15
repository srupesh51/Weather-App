import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from './../../environments/environment';
const BACKEND_API_URL = environment.apiURL + '/weather';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    return this.http.post<any>(BACKEND_API_URL + '/city', {city: city});
  }
}
