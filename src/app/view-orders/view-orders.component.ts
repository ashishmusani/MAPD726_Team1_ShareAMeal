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
  private userType = ''

  constructor(public router: Router, public fireService: FireserviceService, public storageService: StorageService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.orders = []
    let ordersDocs = []
    this.storageService.get('userType').then( uType => {
      this.userType = uType
      if(uType === 'customer'){
        console.log("customer")
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
                    kitchenName = kitchen.kitchenName;
                    this.orders.push({kitchenName, status: order.status, totalPrice: order.totalPrice, kitchenImageURL: kitchen.imageURL})
                  })
                })
              }
            })
          }
        })
      } else if (uType === 'cook'){
        this.storageService.get("kitchenId").then(kId => {
          if(kId){
            this.fireService.getOrdersForCook(kId).subscribe(querySnapshot => {
              if(querySnapshot.size>0){
                querySnapshot.forEach(doc => {
                  ordersDocs.push(doc.data())
                })
                ordersDocs.forEach(order => {
                  let customerName;
                  this.fireService.getDetails({uid: order.customerId}).subscribe(doc => {
                    let customer: any = doc.data()
                    customerName = customer.name
                    this.orders.push({customerName, status: order.status, totalPrice: order.totalPrice, deliveryType: order.deliveryType})
                  })
                })
              }
            })
          }
        })
      } else {
        // delivery agent
        this.fireService.getOrdersForDeliveryAgent().subscribe(querySnapshot => {
          if(querySnapshot.size>0){
            querySnapshot.forEach(doc => {
              ordersDocs.push(doc.data())
            })
            ordersDocs.forEach(order => {
              let customerName;
              this.fireService.getDetails({uid: order.customerId}).subscribe(doc => {
                let customer: any = doc.data()
                customerName = customer.name
                this.orders.push({customerName, status: order.status, totalPrice: order.totalPrice, deliveryType: order.deliveryType})
              })
            })
          }
        })
      }
    })
  }

}
