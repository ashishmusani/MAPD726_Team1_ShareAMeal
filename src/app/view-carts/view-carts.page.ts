import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage-service.service';
import { AlertService } from 'src/services/alert-service.service';

@Component({
  selector: 'app-view-carts',
  templateUrl: './view-carts.page.html',
  styleUrls: ['./view-carts.page.scss'],
})
export class ViewCartsPage implements OnInit {

  private items = [];
  public qty: number;

  constructor(private activatedRoute: ActivatedRoute,
    private fireService: FireserviceService, private storageService: StorageService, 
    private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    let userId = this.activatedRoute.snapshot.paramMap.get('userId');
    let kitchenId = this.activatedRoute.snapshot.paramMap.get('kitchenId');
    let cartId = "";
    this.fireService.getCartByUserIdNKitchenId(String(userId), String(kitchenId)).subscribe(querySnapshot => {
      if(querySnapshot.size > 0){
        querySnapshot.forEach(doc => {
           // get all items that belonged to kitchen
           this.items = []
           cartId = doc.id
           this.fireService.getItemsInCart(doc.id).subscribe(querySnapshot => {
            if(querySnapshot.size > 0){
              querySnapshot.forEach(doc => {
                // add qty for each item
                this.fireService.getItem(doc.data().kitchenId, doc.data().itemId).subscribe(doc1 => {
                  this.items.push({...doc1.data(), "qty":doc.data().itemQuantity, "cartId":cartId, "itemId":doc.id})
                })
              })
            }
          })
        })
      }
      console.log(this.items)
    })
  }

  checkout() {
    this.storageService.get('userId').then(userId => {
      this.router.navigate(['/checkout/', userId, this.activatedRoute.snapshot.paramMap.get('kitchenId')]);
    })
  }

  updateQty(item) {
    if(this.qty > 0) {
      this.fireService.updateQtyInCart(item, this.qty)
      this.alertService.genericAlert("Information", "Update item quantity successfully!")
    }
  }

  qtyChanged($event){
    this.qty = $event.target.value;
  }

}
