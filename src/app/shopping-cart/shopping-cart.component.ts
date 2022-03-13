import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {


  itemisLoaded: boolean;
  item;
  kitchenName;
  kitchenData;
  private currentNumber = 1;
  private bun = 5;
  name;
  //itemisLoaded: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private fireService: FireserviceService) { }

  ngOnInit() {
    this.item='';
    console.log(this.activatedRoute.snapshot.paramMap.get('kitchenId'));
    const kitchenId = this.activatedRoute.snapshot.paramMap.get('kitchenId');
    const itemId = this.activatedRoute.snapshot.paramMap.get('itemId');
    
    console.log(kitchenId);
    // let kitchenId = this.activatedRoute.snapshot.paramMap.get('kitchenId')
    // let itemId = this.activatedRoute.snapshot.paramMap.get('itemId');
    // console.log(kitchenId, itemId)
    this.fireService.getItem(kitchenId, itemId).subscribe(doc => {
      
      this.item = doc.data();
      this.name = this.item.itemname;
      this.itemisLoaded = true;
      console.log(doc.data());
    });

    this.fireService.getKitchen(kitchenId).subscribe(doc => {
      
      this.kitchenData = doc.data();
      this.kitchenName=this.kitchenData.kitchenName;
    });

  }

  ItempriceInc() {
    this.bun = 5 * this.currentNumber;
  }
  ItempriceDec() {
    this.bun = 5 / this.currentNumber;
  }
  increment() {
    this.currentNumber++;
    this.ItempriceInc();
  }

  decrement() {
    if (this.currentNumber <= 1) {
      this.currentNumber = 1;
    } else {
      this.currentNumber--;
      this.ItempriceDec();
    }
  }
  /**addItem() {
    let kitchenId = this.currentKitchenId || 'dummyId'; //should get current user id
    console.log("kitchenId: ", kitchenId)
    let data = {
      itemname: this.itemname,
      description: this.description,
      ingredients: this.ingredients,
      kitchenId: this.currentKitchenId,
      imageURL: this.imageURL,
    }
    this.fireService.addItem(data).then(ref => {
      this.storageService.set('itemId', ref.id);
      this.router.navigate(['/cook/kitchen']);
      this.presentToast();
      }, err => {
        alert(err);
      })
    }**/

}
