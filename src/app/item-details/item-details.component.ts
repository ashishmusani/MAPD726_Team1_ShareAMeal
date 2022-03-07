import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
  private item;
  itemisLoaded: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private fireService: FireserviceService) { }

  ngOnInit() {
    let kitchenId = this.activatedRoute.snapshot.paramMap.get('kitchenId')
    let itemId = this.activatedRoute.snapshot.paramMap.get('itemId');
    console.log(kitchenId, itemId)
    // let kitchenId = this.activatedRoute.snapshot.paramMap.get('kitchenId')
    // let itemId = this.activatedRoute.snapshot.paramMap.get('itemId');
    // console.log(kitchenId, itemId)
    this.fireService.getItem(kitchenId, itemId).subscribe(doc => {
      this.item = doc.data()
      this.itemisLoaded = true;
      console.log(doc.data())
    })
  }

}
