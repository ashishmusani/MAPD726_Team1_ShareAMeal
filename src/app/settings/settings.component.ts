import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(public storageService: StorageService) { }

  ngOnInit() {}

  logout(){
    this.storageService.clear().then(res => console.log(res))
  }
}
