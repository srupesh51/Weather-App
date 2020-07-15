import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { WeatherService } from '../services/weather.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherForm: FormGroup;
  loading = false;
  submitted = false;
  weatherResponse;
  city;
  temperature;
  temperatureType;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService,
    private alertService: AlertService
  ) {

   }

  ngOnInit(): void {
    this.weatherForm = this.formBuilder.group({
        city: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  get f() { return this.weatherForm.controls; }
  resetCity() {
    this.city = "";
    this.temperature = "";
    this.temperatureType = "";
  }
  checkCity() {
    if(this.city !== undefined && this.city !== "" &&
    this.temperature !== undefined && this.temperature !== "" &&
    this.temperatureType !== undefined && this.temperatureType !== "") {
      if(this.f.city.errors) {
        this.resetCity();
        return false;
      }
      return true;
    }
    return false;
  }
  onSubmit() {
    this.submitted = true;
    this.resetCity();
    this.alertService.clear();
    // stop here if form is invalid
    if (this.weatherForm.invalid) {
        return;
    }

    this.loading = true;
    this.weatherService.getWeather(this.f.city.value)
    .pipe(first())
    .subscribe(
        data => {
          this.weatherResponse = data.weatherData;
          this.city = this.weatherResponse.city;
          this.temperature = this.weatherResponse.temperature;
          this.temperatureType = this.weatherResponse.temperature_type;
          this.loading = false;
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          this.loading = false;
    });
  }

}
