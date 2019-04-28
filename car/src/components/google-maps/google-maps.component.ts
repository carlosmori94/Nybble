/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { WeatherService } from 'src/shared/services/weather.service';
import { weatherApiKey } from 'src/environments/environment';
import { Stadistic } from 'src/shared/entities/stadistic';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // providers: [WeatherService]
})
export class GoogleMapsComponent implements OnInit {
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;
  private directionsService = new google.maps.DirectionsService();

  dir: any;
  location: Location;
  distance: any;
  duration: any;
  temperature: any;
  stadistics: Stadistic[] = [];

  constructor(private titleService: Title, private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Home | Nybble');
    this.zoom = 10;
    this.setCurrentPosition();

  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onAddressSelected(result: PlaceResult) {
    console.log('onAddressSelected: ', result);
  }

  searchDirections() {
    this.dir = {
      origin: { lat: this.latitude, lng: this.longitude },
      destination: { lat: this.location.latitude, lng: this.location.longitude },
      travelMode: 'DRIVING'
    }
    this.directionsService.route(this.dir, (response) => {
      this.stadistics.push(new Stadistic('Distance to destination', response.routes[0].legs[0].distance.text));
      this.stadistics.push(new Stadistic('Duration of the trip', response.routes[0].legs[0].duration.text));
      this.setWeather(this.latitude, this.longitude, true);
      this.setWeather(this.location.latitude, this.location.longitude, false);
    });
  }

  setLocation(location: Location) {
    this.location = location;
  }
  setWeather(latitude: number, longitude: number, isOrigin: boolean) {
    const location = isOrigin === true ? 'origin' : 'destination';
    this.weatherService.getWeatherLatLong(latitude, longitude).subscribe(res => {
      this.stadistics.push(new Stadistic('Temperature at ' + location, res.main.temp));
    });
  }
}
