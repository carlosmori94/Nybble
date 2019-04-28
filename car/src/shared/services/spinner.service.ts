import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private runningSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  running = this.runningSubject.asObservable();

  constructor() { }

  setRunning(value: boolean){
    this.runningSubject.next(value);
  }
}
