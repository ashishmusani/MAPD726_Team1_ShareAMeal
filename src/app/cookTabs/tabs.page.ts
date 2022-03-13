import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage-service.service';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router, public storageService: StorageService, public fireService: FireserviceService) {}

  ionViewWillEnter(){
    this.storageService.get("userId").then(uid => {
        console.log(uid)
        this.fireService.getKitchenByUserId(String(uid)).subscribe(querySnapshot => {
          if(querySnapshot.size > 0){
            querySnapshot.forEach(doc => {
              this.storageService.set('kitchenId', doc.id);
              console.log("kitchen set")
            })
          }
        })
    });
  }
}
