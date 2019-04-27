import { Component, OnInit } from '@angular/core';
export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-trip-information',
  templateUrl: './trip-information.component.html',
  styleUrls: ['./trip-information.component.scss']
})


export class TripInformationComponent implements OnInit {
  private checked = true;
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
