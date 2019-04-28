import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsComponent } from 'src/components/google-maps/google-maps.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction
import { AgmCoreModule } from '@agm/core';
import { AngularMaterialModule } from 'src/shared/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatGoogleMapsAutocompleteModule,
    AgmDirectionModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAnNue771AtapM0ACIdE9SpzoEojPqhbqk',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
