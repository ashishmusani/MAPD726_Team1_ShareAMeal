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
  private allOrderItems = {}

  constructor(public router: Router, public fireService: FireserviceService, public storageService: StorageService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.orders = []
    let ordersDocs = []
    this.allOrderItems = {}
    this.storageService.get('userType').then( uType => {
      this.userType = uType
      if(uType === 'customer'){
        console.log("customer")
        this.storageService.get('userId').then(uid => {
          if(uid){
            this.fireService.getOrdersForCustomer(uid).subscribe(querySnapshot => {
              if(querySnapshot.size>0){
                querySnapshot.forEach(doc => {
                  let o: any = doc.data();
                  ordersDocs.push({id: doc.id, ...o});
                })
                ordersDocs.forEach(order => {
                  let kitchenName;
                  this.fireService.getKitchen(order.kitchenId).subscribe(doc => {
                    let kitchen: any = doc.data();
                    kitchenName = kitchen.kitchenName;
                    this.orders.push({kitchenName, status: order.status, totalPrice: order.totalPrice, kitchenImageURL: kitchen.imageURL, id: order.id})
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
                  let o: any = doc.data();
                  ordersDocs.push({id: doc.id, ...o});
                })
                ordersDocs.forEach(order => {
                  let customerName;
                  this.fireService.getDetails({uid: order.customerId}).subscribe(doc => {
                    let customer: any = doc.data()
                    customerName = customer.name
                    this.orders.push({customerName, status: order.status, totalPrice: order.totalPrice, deliveryType: order.deliveryType, id: order.id, items: order.items})
                  })
                  
                  if(order.status === "Confirm" && order.items){
                    order.items.forEach(itemInOrder => {
                      if(this.allOrderItems[itemInOrder.itemname]){
                        this.allOrderItems[itemInOrder.itemname] += parseInt(itemInOrder.qty)
                      } else {
                        this.allOrderItems[itemInOrder.itemname] = parseInt(itemInOrder.qty)
                      }
                    })
                  }
                  console.log(this.allOrderItems)
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
              let o: any = doc.data();
              if(o.status !== "Cancelled")
                ordersDocs.push({id: doc.id, ...o});
            })
            ordersDocs.forEach(order => {
              let customerName;
              this.fireService.getDetails({uid: order.customerId}).subscribe(doc => {
                let customer: any = doc.data()
                customerName = customer.name
                this.orders.push({customerName, status: order.status, totalPrice: order.totalPrice, deliveryType: order.deliveryType, id: order.id})
              })
            })
          }
        })
        console.log(this.orders)
      }
    })
  }
  objectKeysLength(obj) {
    return (Object.keys(obj).length)  
  }
}
