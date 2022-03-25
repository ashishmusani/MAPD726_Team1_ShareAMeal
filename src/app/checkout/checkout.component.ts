import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  private items = [];
  private totalprice= 0;

  public deliveryOptionToggle : boolean = false;
  public deliveryAddress: string;
  public deliveryApartmentNumber: string

  constructor(private activatedRoute: ActivatedRoute, private fireService: FireserviceService,
    public toastController: ToastController, public router: Router, private storageService: StorageService) { }

    ngOnInit() {
    let userId = this.activatedRoute.snapshot.paramMap.get('userId');
    let kitchenId = this.activatedRoute.snapshot.paramMap.get('kitchenId');
    console.log(userId);
    console.log(kitchenId);
    this.fireService.getCartByUserIdNKitchenId(String(userId), String(kitchenId)).subscribe(querySnapshot => {
      if(querySnapshot.size > 0){
        querySnapshot.forEach(doc => {
           // get all items that belonged to kitchen
           this.items = []
           this.fireService.getItemsInCart(doc.id).subscribe(querySnapshot => {
            if(querySnapshot.size > 0){
              querySnapshot.forEach(doc => {
                // add qty for each item
                this.fireService.getItem(doc.data().kitchenId, doc.data().itemId).subscribe(doc1 => {
                  this.items.push({...doc1.data(), "qty":doc.data().itemQuantity})
                  this.totalprice += doc1.data().price * doc.data().itemQuantity
                  console.log(doc.data().price)
                  console.log (doc.data().itemQuantity)
                })
              })
            }
          })
        })
      }
      console.log(this.items)
    })
  }

  toggle() {
    this.deliveryOptionToggle = !this.deliveryOptionToggle;
  }

  createOrder(){
    //debugger
    let newItem =[]
    this.items.map(item => {
      item.kitchenId && delete item['kitchenId']
      delete item['imageURL']
      delete item['description']
      newItem= [...newItem,item]
  })
  
    let orderData = {
        customerId: this.activatedRoute.snapshot.paramMap.get('userId'),
        kitchenId: this.activatedRoute.snapshot.paramMap.get('kitchenId'),
        items: newItem,
        totalPrice: this.totalprice,
        deliveryType: this.deliveryOptionToggle == false ? "Pickup" : `${this.deliveryApartmentNumber}, ${this.deliveryAddress}`
      }
    this.fireService.createOrder(orderData).then(res => {
      this.storageService.get('cartId').then( cartId => {
        if(cartId){
          this.fireService.deleteCart(cartId)
        }
        this.presentToast("Order placed successfully!")
        this.router.navigate(['/customer/kitchens'])
      })
    }, err => {
      this.presentToast("Oops! There was a problem while placing order")
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}