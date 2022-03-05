import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage-service.service';
import { FireserviceService } from 'src/services/fireservice.service';
import { ToastController } from '@ionic/angular';

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
  
  constructor(private router: Router, public storageService: StorageService, 
              public fireService: FireserviceService, public toastController: ToastController) {
    
  }

  ionViewWillEnter(){
    this.storageService.get("kitchenId").then(kId => {
      this.kitchenId = kId
      if(this.kitchenId){
        this.fireService.getKitchen(kId).subscribe(doc => {
          this.kitchenExists = true;
          this.kitchen = doc.data();
        })
      }
    })
  }
  ngOnInit(): void {
  }

  addKitchenClicked(){
    this.router.navigate(['/cook/kitchen/add']);
  }

  addItemClicked(){
    this.router.navigate(['/cook/kitchen/additem']);
  }

  kitchenStatusChange(){
    let newStatus;
    if(this.kitchen.kitchenIsOpen){
      newStatus = false;
    } else {
      newStatus = true;
    }
    this.fireService.changeKitchenStatus(this.kitchenId, newStatus).then(res => {
      this.kitchen.kitchenIsOpen = newStatus
      this.presentToast(newStatus? "open" : "closed");
    })
  }

  async presentToast(newStatus) {
    const toast = await this.toastController.create({
      message: `Kitchen is ${newStatus} now`,
      duration: 2000
    });
    toast.present();
  }
}
