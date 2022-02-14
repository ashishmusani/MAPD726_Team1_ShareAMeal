import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'addkitchen',
  templateUrl: './addkitchen.component.html',
  styleUrls: ['./addkitchen.component.scss'],
})
export class AddkitchenComponent implements OnInit {

  public kitchenName: String;
  public description: String;
  public cookName: String;
  public contactNo: String;

  constructor(public router: Router, public fireService: FireserviceService) {

  }

  ngOnInit() {}

  addNewKitchen() {
    let data = {
      kitchenName: this.kitchenName,
      description: this.description,
      cookName: this.cookName,
      contactNo: this.contactNo
    }
    this.fireService.addNewKitchen(data).then(res => {
      console.log("insert kitchen successfully!");
      alert("insert kitchen successfully!");
    }, err => {
      alert(err);
    })
  }

}
