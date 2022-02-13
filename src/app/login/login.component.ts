import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public email: String;
  public password: String;

  constructor(public router: Router, public fireService: FireserviceService) {

   }

  ngOnInit() {}


  login(){
    console.log(this.password)
    this.fireService.loginWithEmail({email: this.email, password: this.password}).then(res => {
      console.log(res)
      if(res.user.uid){
        this.fireService.getDetails({uid: res.user.uid}).subscribe(res => {
          console.log('Welcome')
          console.log(res);
        })
      }
    }, err => {
      alert(err.message)
    })
  }

}
