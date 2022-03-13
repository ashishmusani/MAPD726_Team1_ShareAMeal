import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';
import { StorageService } from 'src/services/storage-service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
  public currentUserId: String;
  public itemQuantity: number = 1;
  private item;
  itemisLoaded: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private fireService: FireserviceService,
    public storageService: StorageService, public toastController: ToastController) { 
    this.storageService.get('userId').then(userId => {
      this.currentUserId = userId
    })
  }

  ngOnInit() {
    let kitchenId = this.activatedRoute.snapshot.paramMap.get('kitchenId')
    let itemId = this.activatedRoute.snapshot.paramMap.get('itemId');
    console.log(kitchenId, itemId)
    // let kitchenId = this.activatedRoute.snapshot.paramMap.get('kitchenId')
    // let itemId = this.activatedRoute.snapshot.paramMap.get('itemId');
    // console.log(kitchenId, itemId)
    this.fireService.getItem(kitchenId, itemId).subscribe(doc => {
      this.item = doc.data()
      this.itemisLoaded = true;
      console.log(doc.data())
    })
  }

  addToCart() {
    // let data = {
    //   itemname: this.itemname,
    //   description: this.description,
    //   ingredients: this.ingredients,
    //   kitchenId: this.currentKitchenId,
    //   imageURL: this.imageURL,
    // }
    
    // this.fireService.addItem(data).then(ref => {
    //   this.storageService.set('itemId', ref.id);
    //   this.router.navigate(['/cook/kitchen']);
    //   this.presentToast();
    //   }, err => {
    //     alert(err);
    //   })
    // }

    let userId = this.currentUserId || 'dummyId'; //should get current user id
    console.log("userId: ", userId)

    let data = {
      userId: userId,
      kitchenId: this.activatedRoute.snapshot.paramMap.get('kitchenId')
    }

    this.fireService.getCartByUserId(String(userId)).subscribe(querySnapshot => {
      if(querySnapshot.size > 0){
        querySnapshot.forEach(doc => {
          // 1. already exist cart
          if(doc.id) {
            let data = {
              kitchenId: this.activatedRoute.snapshot.paramMap.get('kitchenId'),
              itemId: this.activatedRoute.snapshot.paramMap.get('itemId'),
              itemQuantity: this.itemQuantity
            }
            this.fireService.addItemsToCart(data, doc.id).then(ref => {
             
              }, err => {
                alert(err);
              })
          }
        })
      } else {
        // 2. create new cart
        this.fireService.addToCart(data).then(ref => {
          // add items into cart
          let data = {
            kitchenId: this.activatedRoute.snapshot.paramMap.get('kitchenId'),
            itemId: this.activatedRoute.snapshot.paramMap.get('itemId'),
            itemQuantity: this.itemQuantity
          }
          this.fireService.addItemsToCart(data, ref.id).then(ref => {
           
            }, err => {
              alert(err);
            })
        }, err => {
          alert(err);
        })
      }
      // notification
      this.presentToast()
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Add item to cart successfully',
      duration: 2000
    });
    toast.present();
  }
  
}
