import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
   item;
  itemisLoaded: boolean = false;
  itemId;

  constructor(private activatedRoute: ActivatedRoute, private fireService: FireserviceService) { }

  ngOnInit() {
    let kitchenId = this.activatedRoute.snapshot.paramMap.get('kitchenId');
    let itemId = this.activatedRoute.snapshot.paramMap.get('itemId');
    console.log(kitchenId, itemId);
    // let kitchenId = this.activatedRoute.snapshot.paramMap.get('kitchenId')
    // let itemId = this.activatedRoute.snapshot.paramMap.get('itemId');
    // console.log(kitchenId, itemId)
    this.fireService.getItem(kitchenId, itemId).subscribe(doc => {
    
     // let i=doc;
      const itemId = this.activatedRoute.snapshot.paramMap.get('itemId');;
      this.item = doc.data()
      this.item.itemId=itemId;
      this.itemisLoaded = true;
      console.log(doc.data())
    })
  }

}
