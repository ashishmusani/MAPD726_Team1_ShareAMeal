import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { StorageService } from 'src/services/storage-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'addkitchen',
  templateUrl: './addkitchen.component.html',
  styleUrls: ['./addkitchen.component.scss'],
})
export class AddkitchenComponent implements OnInit {

  public kitchenName: String;
  public description: String;
  public cookName: String;
  public contactNo: String;
  public address: String;
  public currentUserId: String;
  public cuisine: String;
  errorMessage = '';
  public imageURL: string;

  constructor(public router: Router, public fireService: FireserviceService, 
              public toastController: ToastController, public auth: AngularFireAuth,
              public storageService: StorageService,
              public angularFireStorageModule: AngularFireStorage) {
    this.storageService.get('userId').then(userId => {
      this.currentUserId = userId
    })
  }

  ngOnInit() {}

  addNewKitchen() {
    let userId = this.currentUserId || 'dummyId'; //should get current user id
    console.log("userId: ", userId)
    let data = {
      kitchenName: this.kitchenName,
      description: this.description,
      cookName: this.cookName,
      contactNo: this.contactNo,
      address: this.address,
      userId: this.currentUserId,
      cuisine: this.cuisine,
      imageURL: this.imageURL,
      kitchenIsOpen: true
    }
    this.fireService.addNewKitchen(data).then(ref => {
      this.storageService.set('kitchenId', ref.id);
      this.router.navigate(['/cook/kitchen']);
      this.presentToast();
    }, err => {
      alert(err);
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Kitchen created successfully',
      duration: 2000
    });
    toast.present();
  }

  uploadPhoto(event) {
    this.fireService.storeImage(event.target.files[0], this.kitchenName).then(
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
}
