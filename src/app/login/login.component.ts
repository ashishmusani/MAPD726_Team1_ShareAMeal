import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';
import {StorageService} from 'src/services/storage-service.service';
import { AlertService } from 'src/services/alert-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public email: String;
  public password: String;

  constructor(public router: Router, public fireService: FireserviceService, public storageService: StorageService, private alertService: AlertService) {
  
  }

  ngOnInit() {}


  login(){
    this.fireService.loginWithEmail({email: this.email, password: this.password}).then(res => {
      if(res.user.uid){
        this.storageService.set('userId', res.user.uid);
        this.fireService.getDetails({uid: res.user.uid}).subscribe(data => {
          if(data.exists){
            let currentUser = data.data();
            this.storageService.set('userType', currentUser['userType']);
            if(currentUser['userType'] === 'cook')
              this.router.navigate(['/cook'])
            else if (currentUser['userType'] === 'customer')
              this.router.navigate(['/customer/kitchens'])
            else if (currentUser['userType'] === 'deliveryAgent')
              this.router.navigate(['/deliveryagent'])
          }
        })
      }
    }, err => {
      this.alertService.genericAlert("Error", "You have entered an invalid email or password")
    })
  }

}
