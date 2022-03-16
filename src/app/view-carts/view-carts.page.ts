import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'app-view-carts',
  templateUrl: './view-carts.page.html',
  styleUrls: ['./view-carts.page.scss'],
})
export class ViewCartsPage implements OnInit {

  items = [];
  quantity = 1;
  quantityForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private fireService: FireserviceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.quantityForm = this.formBuilder.group({
      qty: [1]
    });

    const userId = this.activatedRoute.snapshot.paramMap.get('userId');
    const kitchenId = this.activatedRoute.snapshot.paramMap.get('kitchenId');
    this.fireService.getCartByUserIdNKitchenId(String(userId), String(kitchenId)).subscribe(querySnapshot => {
      if(querySnapshot.size > 0){
        querySnapshot.forEach(doc => {
           // get all items that belonged to kitchen
           this.items = [];
           this.fireService.getItemsInCart(doc.id).subscribe(querySnapshot => {
            if(querySnapshot.size > 0){
              querySnapshot.forEach(doc => {
                // add qty for each item

                this.fireService.getItem(doc.data().kitchenId, doc.data().itemId).subscribe(doc1 => {
                  console.log('DOC', doc.data().itemId);
                  this.items.push({...doc1.data(), qty:doc.data().itemQuantity, itemId:doc.data().itemId});
                });
              });
            }
          });
        });
      }
      console.log('Items', this.items);
    });
  }
  updateCartItem(item) {
    const cartId = localStorage.getItem('cartId');
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items[index].itemQuantity = this.quantityForm.value.qty * 1;
    }
    console.log('Updated Data', this.items[index]);
    this.fireService.updateCartItem(this.items[index], cartId).then(res=>{
      console.log(res);

    });
  }

  removeItem(item)
  {

    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }

    const cartId = localStorage.getItem('cartId');
     this.fireService.removeItemsfromCart(item, cartId).then(querySnapshot => {
    console.log('Res', querySnapshot);

     }, error=> {
       console.log(error);

     });
  }

}
