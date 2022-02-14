import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  kitchens: Observable<any[]>;

  constructor(firestore: AngularFirestore, private router: Router) {
    this.kitchens = firestore.collection('kitchens').valueChanges();
  }

  addKitchenClicked(){
    this.router.navigate(['/cook/kitchen/add']);
  }
}
