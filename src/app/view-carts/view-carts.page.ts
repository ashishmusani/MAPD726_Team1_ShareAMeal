import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-view-carts',
  templateUrl: './view-carts.page.html',
  styleUrls: ['./view-carts.page.scss'],
})
export class ViewCartsPage implements OnInit {

  items = [];
  quantity = '';
  quantityForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private fireService: FireserviceService,
              private formBuilder: FormBuilder,
              public toastController: ToastController) { }

  ngOnInit() {
    this.quantityForm = this.formBuilder.group({
      qty: [1]
    });

    const userId = this.activatedRoute.snapshot.paramMap.get('userId');
    const kitchenId = this.activatedRoute.snapshot.paramMap.get('kitchenId');

    this.fireService.getCartByUserIdNKitchenId(String(userId), String(kitchenId)).subscribe(querySnapshot => {
      if(querySnapshot.size > 0){
        querySnapshot.forEach(doc => {
           // get all items that belonged to kitchen
           this.items = [];
           this.fireService.getItemsInCart(doc.id).subscribe(querySnapshot => {
            if(querySnapshot.size > 0){
              querySnapshot.forEach(doc => {
                // add qty for each item
                this.fireService.getItem(doc.data().kitchenId, doc.data().itemId).subscribe(doc1 => {
                  this.items.push({...doc1.data(), itemQuantity:doc.data().itemQuantity, itemId:doc.data().itemId, cartItemId: doc.ref.id});
                });
              });
            }
          });
        });
      }
      console.log('Items', this.items);
    });
  }
  updateCartItem(item) {
    const cartId = localStorage.getItem('cartId');
    // const index = this.items.indexOf(item);
    // if (index > -1) {
    //   this.items[index].itemQuantity = this.quantityForm.value.qty * 1;
    // }
    this.fireService.updateCartItem(item, cartId).then(res=>{
      this.presentToast('Updated cart item successfully!');
    });
  }

  removeItem(item) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }

    const cartId = localStorage.getItem('cartId');
     this.fireService.removeItemsfromCart(item, cartId).then(querySnapshot => {
       this.presentToast('Cart item removed successfully!');
     }, error=> {
       console.log(error);
     });
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
}
