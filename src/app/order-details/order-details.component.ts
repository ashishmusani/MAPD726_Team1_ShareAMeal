import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {

  private order: any;
  private orderId: String;
  constructor(private activatedRoute: ActivatedRoute, public fireService: FireserviceService) { }
  private nextPossibleStatus: String;

  ngOnInit(){}

  ionViewWillEnter() {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('orderId');
    if(this.orderId){
      this.fireService.getOrder(this.orderId).subscribe(doc => {
        this.order =  doc.data()
        this.nextPossibleStatus = this.getNextPossibleStatus(this.order.status)
      })
    }
  }

  changeOrderStatus(){
    console.log('here')
    this.fireService.updateOrderStatus(this.orderId, this.getNextPossibleStatus(this.order.status))
  }

  getNextPossibleStatus(currentStatus: String){
    switch(currentStatus){
      case 'Open':
        return 'Confirm';
        break;
      
      case 'Confirm':
        return 'Preparing';
        break;

      case 'Preparing':
        return 'Ready';
        break;
      
    }
  }
  

}
