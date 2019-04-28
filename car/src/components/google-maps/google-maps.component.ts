/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { WeatherService } from 'src/shared/services/weather.service';
import { Stadistic } from 'src/shared/entities/stadistic';
import { SpinnerService } from 'src/shared/services/spinner.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [WeatherService, SpinnerService]
})
export class GoogleMapsComponent implements OnInit {

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;
  private directionsService = new google.maps.DirectionsService();
  private location: Location;
  private stadistics: Stadistic[] = [];
  private dir: google.maps.DirectionsRequest;
  private showSpinner$: Observable<boolean>;
  private valueLocation: any;
  private enableSearchSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  enableSearch$ = this.enableSearchSubject.asObservable();
  constructor(
    private weatherService: WeatherService,
    private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.setRunning(false);
    this.enableSearchSubject.next(true);
    this.showSpinner$ = this.spinnerService.running;
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

  searchDirections() {
    this.enableSearchSubject.next(false);
    this.spinnerService.setRunning(true);
    // Creamos payload para consumir PLACES API de Google
    this.dir = {
      origin: { lat: this.latitude, lng: this.longitude },
      destination: { lat: this.location.latitude, lng: this.location.longitude },
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(this.dir, (response) => {
      // Agrupamos estadisticas
      this.stadistics.push(new Stadistic('Distance to destination', response.routes[0].legs[0].distance.text));
      this.stadistics.push(new Stadistic('Duration of the trip', response.routes[0].legs[0].duration.text));
      this.setWeather(this.latitude, this.longitude, true);
      this.setWeather(this.location.latitude, this.location.longitude, false);
      this.spinnerService.setRunning(false);
    });
  }

  setLocation(location: Location) {
    this.location = location;
  }

  setWeather(latitude: number, longitude: number, isOrigin: boolean) {
    // Hacemos que set weather sea dinamico entre origen y destino
    const location = isOrigin === true ? 'origin' : 'destination';
    this.weatherService.getWeatherLatLong(latitude, longitude).subscribe(res => {
      this.stadistics.push(new Stadistic('Temperature at ' + location, res.main.temp, true));
    });
  }
  clearDirections() {
    this.enableSearchSubject.next(true);
    this.valueLocation = '';
    this.setCurrentPosition();
    this.stadistics = [];
    this.dir = null;
  }
}
