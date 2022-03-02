import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public uid = '';
  /* private uidSub = new Subject<string>();
  uidObs = this.uidSub.asObservable(); */
  constructor() { }

  /* getUid() {
    this.uid
  }) */


}
