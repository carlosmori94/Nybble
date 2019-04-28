import { Component, OnInit, Input } from '@angular/core';
import { FarenheitPipe } from 'src/shared/pipes/farenheit.pipe';
import { BehaviorSubject } from 'rxjs';
import { CelciusPipe } from 'src/shared/pipes/celcius.pipe';

@Component({
  selector: 'app-travel-stadistics',
  templateUrl: './travel-stadistics.component.html',
  styleUrls: ['./travel-stadistics.component.scss'],
  providers: [FarenheitPipe, CelciusPipe]
})
export class TravelStadisticsComponent implements OnInit {
  @Input() title;
  @Input() stadistic;
  @Input() isTemperature;
  private celciusDegree;
  private farenheitDegree;
  private isFarenheit = false;

  constructor(private farenheitPipe: FarenheitPipe, private celciusPipe: CelciusPipe) { }

  ngOnInit() {
    if (this.isTemperature) {
      // Viene en Kelvin de la API
      this.celciusDegree = this.calculateCelcius(this.stadistic);
      this.farenheitDegree = this.calculateFarenheit(this.stadistic);
      this.stadistic = this.celciusDegree;
    }
  }
  changeDegreeScale() {
    if (this.isFarenheit) {
      this.stadistic = this.celciusDegree;
    } else {
      this.stadistic = this.farenheitDegree;
    }
    this.isFarenheit = !this.isFarenheit;
  }
  calculateFarenheit(kelvinDegrees) {
    const farenheitDegrees = (kelvinDegrees - 273.15) * (9 / 5) + 32;
    return this.farenheitPipe.transform(farenheitDegrees);
  }
  calculateCelcius(kelvinDegrees) {
    const celciusDegree = kelvinDegrees - 273.15;
    return this.celciusPipe.transform(celciusDegree);
  }
}
