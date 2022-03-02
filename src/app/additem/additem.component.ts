import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';
import {Location} from '@angular/common';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss'],
})
export class AddItemComponent implements OnInit {

  public itemname: String;
  public ingredients: String;
  public description: string;

  constructor(private router: Router, public fireService: FireserviceService, 
    private _location: Location,
    private _session: SessionService) { }

  ngOnInit() {}

  goBack(){
    this.router.navigate(['/kitchen']);
  }

  addItem() {
    this.fireService.addItem({itemname: this.itemname, ingredients: this.ingredients, description: this.description}).then(res => {
      this._location.back();
      }, err => {
        alert(err);
      })
    }

}
