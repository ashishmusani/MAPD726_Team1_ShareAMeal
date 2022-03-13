import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'app-items-in-kitchens',
  templateUrl: './items-in-kitchens.page.html',
  styleUrls: ['./items-in-kitchens.page.scss'],
})
export class ItemsInKitchensPage implements OnInit {
  private items = [];
  kitchenName: String;
  kitchenId: String;

  constructor(private activatedRoute: ActivatedRoute,
    private fireService: FireserviceService) { }

  ngOnInit() {
    
    let userId = this.activatedRoute.snapshot.paramMap.get('userId');
    this.fireService.getKitchenByUserId(String(userId)).subscribe(querySnapshot => {
      if(querySnapshot.size > 0){
        querySnapshot.forEach(doc => {
          this.kitchenName = doc.data()['kitchenName']
           // get all items that belonged to kitchen
           this.items = []
           this.kitchenId = doc.id
           this.fireService.getItemsInKitchen(doc.id).subscribe(querySnapshot => {
            if(querySnapshot.size > 0){
              querySnapshot.forEach(doc => {
                
                const itemId = doc.id
                this.items.push({...doc.data(), itemId})
              })
              console.log(this.items)
            }
          })
        })
      }
    })
  }

  deleteItem(item: any){
  console.log(item,'----');
  }
}
