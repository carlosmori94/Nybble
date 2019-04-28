import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsComponent } from 'src/components/google-maps/google-maps.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction
import { AgmCoreModule } from '@agm/core';
import { AngularMaterialModule } from 'src/shared/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/shared/services/dataService.service';
import { WeatherService } from 'src/shared/services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { googleApiKey } from 'src/environments/environment';
import { TravelStadisticsComponent } from 'src/components/travel-stadistics/travel-stadistics.component';
import { FormsModule } from '@angular/forms';
import { FarenheitPipe } from 'src/shared/pipes/farenheit.pipe';
import { CelciusPipe } from 'src/shared/pipes/celcius.pipe';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent,
    TravelStadisticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularMaterialModule,
    MatGoogleMapsAutocompleteModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: googleApiKey.value,
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
