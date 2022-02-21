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

  constructor(firestore: AngularFirestore, private router: Router) {
    
  }

  addKitchenClicked(){
    this.router.navigate(['/cook/kitchen/add']);
  }

  addItemClicked(){
    this.router.navigate(['/cook/kitchen/additem']);
  }
}
