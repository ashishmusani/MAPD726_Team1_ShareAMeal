import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  private items = [];
  private totalprice= 0;

  constructor(private activatedRoute: ActivatedRoute,
    private fireService: FireserviceService) { }

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

}