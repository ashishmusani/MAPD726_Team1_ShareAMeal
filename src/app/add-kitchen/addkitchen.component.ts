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
  public opening: String;
  public closing: String;

  constructor(public router: Router, public fireService: FireserviceService) {

   }

  ngOnInit() {}

}
