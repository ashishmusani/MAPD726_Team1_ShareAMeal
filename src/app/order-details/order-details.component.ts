import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertService } from 'src/services/alert-service.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {

  private order: any;
  private orderId: String;
  private userType: String;
  private kitchen: any;
  private pickupAddress: String = "";
  private pickupPhoneNo: String = "";
  private dropoffPhoneNo: String ="";
  constructor(private activatedRoute: ActivatedRoute, public fireService: FireserviceService, 
    public router: Router, public toastController: ToastController, private alertService: AlertService) { }
  private nextPossibleStatus: String;

  ngOnInit(){}

  ionViewWillEnter() {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('orderId');
    this.userType = this.activatedRoute.snapshot.paramMap.get('userType');
    if(this.orderId){
      this.fireService.getOrder(this.orderId).subscribe(doc => {
        this.order =  doc.data()
        this.nextPossibleStatus = this.getNextPossibleStatus(this.order.status)
        // get kitchen address and contact no.
        this.fireService.getKitchen(this.order.kitchenId).subscribe(doc => {
          this.kitchen = doc.data()
          this.pickupAddress = this.kitchen.address
          this.pickupPhoneNo = this.kitchen.contactNo
        })
      })
    }
  }

  changeOrderStatus(){
    console.log('here')
    this.fireService.updateOrderStatus(this.orderId, this.getNextPossibleStatus(this.order.status)).then(res => {
      this.router.navigate(['/cook'])
    })
  }

  cancelOrder(){
    console.log('cancelling Done')
    this.fireService.updateOrderStatus(this.orderId, "Cancelled").then(res => {
      this.presentToast("Order Cancelled successfully!")
      this.router.navigate(['/customer'])
    }, err => {
      this.presentToast("Order could not be cancelled!")
    })
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

  deliverOrder(orderId, newStatus) {
    this.fireService.updateOrderStatus(this.orderId, newStatus).then(res => {
      // alert message
      this.alertService.genericAlert("Information", "You have updated status of order successfully!")
      this.router.navigate(['/deliveryagent/orders'])
    })
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
