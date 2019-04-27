import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripInformationComponent } from 'src/components/trip-information/trip-information.component';

const routes: Routes = [
  { path: '', component: TripInformationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
