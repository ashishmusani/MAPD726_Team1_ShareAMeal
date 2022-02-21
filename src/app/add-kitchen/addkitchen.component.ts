import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { StorageService } from 'src/services/storage-service.service';

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
  public currentUserId: String;

  constructor(public router: Router, public fireService: FireserviceService, 
              public toastController: ToastController, public auth: AngularFireAuth,
              public storageService: StorageService) {
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
      userId: this.currentUserId
    }
    this.fireService.addNewKitchen(data).then(ref => {
      console.log(ref.id)
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
}