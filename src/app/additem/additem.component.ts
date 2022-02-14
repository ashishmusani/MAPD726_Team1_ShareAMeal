import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss'],
})
export class AdditemComponent implements OnInit {

  public itemname: String;
  public ingredients: String;
  public description: string;

  constructor(private router: Router, public fireService: FireserviceService) { }

  ngOnInit() {}

  goBack(){
    this.router.navigate(['/kitchen']);
  }

  addItem() {
    console.log('function ran')
    this.fireService.addItem({itemname: this.itemname, ingredients: this.ingredients, description: this.description}).then(res => {
      
        console.log('Item Added')
    
        
        }, err => {
          alert(err);
        })
      }

}
