import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-travel-stadistics',
  templateUrl: './travel-stadistics.component.html',
  styleUrls: ['./travel-stadistics.component.scss']
})
export class TravelStadisticsComponent implements OnInit {
  @Input() title;
  @Input() stadistic;
  constructor() { }

  ngOnInit() {
  }

}
