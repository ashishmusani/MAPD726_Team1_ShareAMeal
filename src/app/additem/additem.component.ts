import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';
import {Location} from '@angular/common';
import { ToastController } from '@ionic/angular';
import { AlertService } from 'src/services/alert-service.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss'],
})
export class AddItemComponent implements OnInit {

  public itemname: String;
  public ingredients: String;
  public description: string;

  constructor(private router: Router, public fireService: FireserviceService, 
              private _location: Location, public toastController: ToastController,
              private alertService: AlertService) { }

  ngOnInit() {}

  goBack(){
    this.router.navigate(['/kitchen']);
  }

  addItem() {
    this.fireService.addItem({itemname: this.itemname, ingredients: this.ingredients, description: this.description}).then(res => {
      this._location.back();
      this.presentToast();
      }, err => {
        this.alertService.genericAlert("Error", "There was a problem. Please try again.")
      })
    }

    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Item added successfully',
        duration: 2000
      });
      toast.present();
    }

}
