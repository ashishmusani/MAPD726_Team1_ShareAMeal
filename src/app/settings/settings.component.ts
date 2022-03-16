import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(public storageService: StorageService, public router: Router) { }

  ngOnInit() {}

  logout(){
    try{
      this.storageService.clear();
      this.router.navigate(['/'])
    } catch (err) {
    }

  }
}
