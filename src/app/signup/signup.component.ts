import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  public email: String;
  public password: String;

  constructor(private router: Router, public fireService: FireserviceService) {

  }

  ngOnInit() {}

  goBack(){
    this.router.navigate(['/login']);
  }

  signup(){
    this.fireService.signup({email: this.email, password: this.password}).then(res => {
      if(res.user.uid){
        let data = {
          email: this.email,
          password: this.password,
          uid: res.user.uid
        }
        this.fireService.saveDetails(data).then(res => {
          this.router.navigate
        }, err => {
          alert(err);
        })
      }
    })
  }

}
