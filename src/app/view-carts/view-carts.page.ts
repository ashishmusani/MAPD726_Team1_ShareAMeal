import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'app-view-carts',
  templateUrl: './view-carts.page.html',
  styleUrls: ['./view-carts.page.scss'],
})
export class ViewCartsPage implements OnInit {

  private items = [];

  constructor(private activatedRoute: ActivatedRoute,
    private fireService: FireserviceService) { }

  ngOnInit() {
    let userId = this.activatedRoute.snapshot.paramMap.get('userId');
    this.fireService.getCartByUserId(String(userId)).subscribe(querySnapshot => {
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
