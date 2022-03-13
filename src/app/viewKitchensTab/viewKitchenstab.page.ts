import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage-service.service';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'app-viewKitchenstab',
  templateUrl: 'viewKitchenstab.page.html',
  styleUrls: ['viewKitchenstab.page.scss']
})
export class ViewKitchensTabPage implements OnInit {

  private kitchens = [];
  
  constructor(public fireService: FireserviceService, private router: Router, public storageService: StorageService) {
    
  }

  ngOnInit(): void {
    this.kitchens = [];
    this.fireService.getKitchens().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.kitchens.push(doc.data())
      })
      console.log(this.kitchens)
    })
  }

  loadKitchensList(event){
    this.kitchens = [];
    this.fireService.getKitchens().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.kitchens.push(doc.data())
      })
      event.target.complete();
    })
  }
}
