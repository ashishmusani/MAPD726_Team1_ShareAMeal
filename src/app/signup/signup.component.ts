import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  public email: String;
  public password: String;
  public userType: String;
  public name: String;

  constructor(private router: Router, public fireService: FireserviceService, public toastController: ToastController) {

  }

  ngOnInit() {}

  goBack(){
    this.router.navigate(['/login']);
  }

  signup(){
    this.fireService.signup({email: this.email, password: this.password, userType: this.userType, name: this.name}).then(res => {
      if(res.user.uid){
        let data = {
          email: this.email,
          password: this.password,
          userType: this.userType,
          uid: res.user.uid,
          name: this.name
        }
        this.fireService.saveDetails(data).then(res => {
          this.router.navigate(['/login']);
          this.presentToast();
        }, err => {
          alert(err);
        })
      }
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Account Created Successfully',
      duration: 2000
    });
    toast.present();
  }

  userTypeChanged($event){
    this.userType = $event.target.value;
  }
}
