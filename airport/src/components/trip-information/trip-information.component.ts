import { Component, OnInit } from '@angular/core';
import { ButtonActions } from 'src/shared/enums/button-actions.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
export interface Plane {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-trip-information',
  templateUrl: './trip-information.component.html',
  styleUrls: ['./trip-information.component.scss']
})


export class TripInformationComponent implements OnInit {
  private checked = true;
  private action: ButtonActions;
  private profileForm = new FormGroup({
    resevationNumber: new FormControl('', Validators.required),
    lastNameReservation: new FormControl('', Validators.required),
    ship: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required),
    rememberMe: new FormControl(false),
  });
  planess: Plane[] = [
    { value: 0, viewValue: 'Boejing 777' },
    { value: 1, viewValue: 'Boejing 788' },
    { value: 2, viewValue: 'Raptor' }
  ];
  readonly: boolean;
  constructor() { }

  ngOnInit() {
    this.action = ButtonActions.FIND_MY_RESERVATION;
    this.readonly = false;
    const formValues = JSON.parse(localStorage.getItem('form'));
    if (formValues) {
      this.profileForm.controls['resevationNumber'].setValue(formValues.resevationNumber);
      this.profileForm.controls['lastNameReservation'].setValue(formValues.lastNameReservation);
      this.profileForm.controls['ship'].setValue(formValues.ship);
      this.profileForm.controls['date'].setValue(new Date(formValues.date));
      this.profileForm.controls['rememberMe'].setValue(formValues.rememberMe);
    }
  }
  public excecuteAction(action: ButtonActions) {
    switch (action) {
      case ButtonActions.FIND_MY_RESERVATION:
        this.action = ButtonActions.EDIT_MY_RESERVATION;
        this.EditReservation();
        break;
      case ButtonActions.EDIT_MY_RESERVATION:
        this.action = ButtonActions.FIND_MY_RESERVATION;
        this.FindReservation();
        break;

    }
  }
  private EditReservation() {
    this.readonly = !this.readonly;
    if (this.profileForm.get('rememberMe').value) {
      const currentForm = this.profileForm.value;
      localStorage.setItem('form', JSON.stringify(currentForm));
    }
  }
  private FindReservation() {
    this.readonly = !this.readonly;
    if (!this.profileForm.get('rememberMe').value) {
      this.profileForm.reset();
    }
  }
}
