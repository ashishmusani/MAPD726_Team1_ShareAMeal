import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';
import {Location} from '@angular/common';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { StorageService } from 'src/services/storage-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss'],
})
export class AddItemComponent implements OnInit {

  public itemname: String;
  public ingredients: String;
  public description: string;
  public currentKitchenId: String;
  public itemQuantity: number = 1;
  public imageURL: string;
  public itemPrice: Number;
  errorMessage = '';

  constructor(private router: Router, public fireService: FireserviceService, private _location: Location, public toastController: ToastController, public auth: AngularFireAuth,
              public storageService: StorageService,
              public angularFireStorageModule: AngularFireStorage) {
                this.storageService.get('kitchenId').then(kitchenId => {
                  this.currentKitchenId = kitchenId
                })
              }

  ngOnInit() {}

  goBack(){
    this.router.navigate(['/cook/kitchen']);
  }

  addItem() {
    let kitchenId = this.currentKitchenId || 'dummyId'; //should get current user id
    console.log("kitchenId: ", kitchenId)
    let data = {
      itemname: this.itemname,
      description: this.description,
      ingredients: this.ingredients,
      kitchenId: this.currentKitchenId,
      itemQuantity: this.itemQuantity,
      imageURL: this.imageURL,
      price: this.itemPrice
    }
    this.fireService.addItem(data).then(ref => {
      this.storageService.set('itemId', ref.id);
      this.router.navigate(['/cook/kitchen']);
      this.presentToast();
      }, err => {
        alert(err);
      })
    }

    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Item created successfully',
        duration: 2000
      });
      toast.present();
    }

    uploadPhoto(event) {
      this.fireService.storeImage(event.target.files[0], this.itemname).then(
        (res: any) => {
          if (res) {
            console.log(res);
            this.imageURL = res;
          } 
        },
        (error: any) => {
          this.errorMessage = 'File size exceeded. Maximum file size 1 MB'
        }
      );
    }

    increaseQuantity(){
      this.itemQuantity+= 1
    }

    decreaseQuantity(){
      if(this.itemQuantity>0){
        this.itemQuantity-=1
      }
    }

}


