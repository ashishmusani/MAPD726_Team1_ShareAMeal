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

  constructor(private activatedRoute: ActivatedRoute,
    private fireService: FireserviceService) { }

  ngOnInit() {
    let userId = this.activatedRoute.snapshot.paramMap.get('userId');
    this.fireService.getKitchenByUserId(String(userId)).subscribe(querySnapshot => {
      if(querySnapshot.size > 0){
        querySnapshot.forEach(doc => {
           // get all items that belonged to kitchen
           this.fireService.getItemsInKitchen(String(userId), doc.id).subscribe(querySnapshot => {
            if(querySnapshot.size > 0){
              querySnapshot.forEach(doc => {
                this.items.push(doc.data())
              })
            }
          })
        })
      }
    })
  }
}
