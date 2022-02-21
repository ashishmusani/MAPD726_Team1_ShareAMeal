import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  kitchenExists: boolean = false;
  kitchenId: String;
  
  constructor(firestore: AngularFirestore, private router: Router, public storageService: StorageService) {
    this.storageService.get('kitchenId').then(kitchenId => {
      console.log("kitchenId: ", kitchenId)
      if(kitchenId){
        this.kitchenExists = true
        this.kitchenId = kitchenId
      }
    })
  }


  addKitchenClicked(){
    this.router.navigate(['/cook/kitchen/add']);
  }

  addItemClicked(){
    this.router.navigate(['/cook/kitchen/additem']);
  }
}
