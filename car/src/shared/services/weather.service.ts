import { Injectable } from '@angular/core';
import { DataService } from '../../shared/services/dataService.service';
import { isNullOrUndefined } from 'util';
import { weatherApiKey } from 'src/environments/environment';

@Injectable()
export class WeatherService {

    constructor(private dataService: DataService) { }
    getWeatherLatLong(latitude: Number, longitude: Number) {
        return this.dataService.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey.value}`);
    }
    // list(): Observable<Agent[]> {
    //     return this.dataService.get<Agent[]>(this.path);
}
