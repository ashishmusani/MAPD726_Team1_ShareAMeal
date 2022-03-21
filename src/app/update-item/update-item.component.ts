import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';
import { Router } from '@angular/router'; 
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss'],
})
export class UpdateItemComponent implements OnInit {

  public item;
  public kitchenId;
  public itemId;
  public itemname: String;
  public ingredients: String;
  public description: string;
  public currentKitchenId: String;
  public itemQuantity: number = 1;
  // public imageURL: string;
  errorMessage = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private fireService: FireserviceService, public toastController: ToastController) { }

  ngOnInit() {
    this.kitchenId = this.activatedRoute.snapshot.paramMap.get('kitchenId');
    this.itemId = this.activatedRoute.snapshot.paramMap.get('itemId');

    //console.log(itemId, kitchenId)

    this.fireService.getItem(this.kitchenId, this.itemId).subscribe(doc => {
      this.item = doc.data()
      console.log(doc.data())
    })

  }

  goBack(){
    this.router.navigate(['/cook/kitchen']);
  }

  increaseQuantity(){
    this.item.itemQuantity+= 1
  }

  decreaseQuantity(){
    if(this.item.itemQuantity>0){
      this.item.itemQuantity-=1
    }
  }

  updateItem(){
    let data = {
      description: this.item.description,
      itemname: this.item.itemname,
      ingredients: this.item.ingredients,
      itemQuantity: this.item.itemQuantity
    }

    this.fireService.updateItem(this.kitchenId, this.itemId, data).then(ref => {
      this.router.navigate(['/cook/kitchen']);
      this.presentToast();
      }, err => {
        alert(err);
      })
    }

    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Item updated successfully',
        duration: 2000
      });
      toast.present();
    }
  }
