import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';
import { ToastController } from '@ionic/angular';

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

  constructor(public router: Router, public fireService: FireserviceService, public toastController: ToastController) {

  }

  ngOnInit() {}

  addNewKitchen() {
    let data = {
      kitchenName: this.kitchenName,
      description: this.description,
      cookName: this.cookName,
      contactNo: this.contactNo
    }
    this.fireService.addNewKitchen(data).then(res => {
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
