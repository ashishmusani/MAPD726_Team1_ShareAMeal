import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage-service.service';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  kitchenExists: boolean = false;
  kitchenId: String;
  private items = [];
  private kitchen;
  
  constructor(private router: Router, public storageService: StorageService, public fireService: FireserviceService) {
    
  }

  ionViewWillEnter(){
    this.fireService.getCurrentUser().then(user => {
      if(user.uid){
        console.log(user.uid)
        this.fireService.getKitchenByUserId(String(user.uid)).subscribe(querySnapshot => {
          if(querySnapshot.size > 0){
            this.kitchenExists = true
            querySnapshot.forEach(doc => {
              console.log(doc.data())
              this.kitchen = doc.data();
              this.kitchenId = doc.id
              this.storageService.set('kitchenId', doc.id);
            })
          }
        })
      }  
    });
  }
  ngOnInit(): void {
  }

  addKitchenClicked(){
    this.router.navigate(['/cook/kitchen/add']);
  }

  addItemClicked(){
    this.router.navigate(['/cook/kitchen/additem']);
  }
}
