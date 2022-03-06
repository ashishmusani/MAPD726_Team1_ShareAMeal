import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let kitchenId = this.activatedRoute.snapshot.paramMap.get('kitchenId')
    let itemId = this.activatedRoute.snapshot.paramMap.get('itemId');
    console.log(kitchenId, itemId)
    
  }

}
