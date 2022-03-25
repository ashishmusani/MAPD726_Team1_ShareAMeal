import { Component, OnInit } from '@angular/core';
import { FireserviceService } from 'src/services/fireservice.service';
import { Router } from '@angular/router';
import {StorageService} from 'src/services/storage-service.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss'],
})
export class ViewOrdersComponent implements OnInit {

  private orders = []

  constructor(public router: Router, public fireService: FireserviceService, public storageService: StorageService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.orders = []
    let ordersDocs = []
    this.storageService.get('userId').then(uid => {
      if(uid){
        this.fireService.getOrdersForCustomer(uid).subscribe(querySnapshot => {
          if(querySnapshot.size>0){
            querySnapshot.forEach(doc => {
              ordersDocs.push(doc.data());
            })
            ordersDocs.forEach(order => {
              let kitchenName;
              this.fireService.getKitchen(order.kitchenId).subscribe(doc => {
                let kitchen: any = doc.data();
                kitchenName = kitchen.cookName;
                this.orders.push({kitchenName, status: order.status, totalPrice: order.totalPrice, kitchenImageURL: kitchen.imageURL})
              })
            })
          }
        })
      }
    })
  }

}
