import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage-service.service';

@Component({
  selector: 'app-viewKitchenstab',
  templateUrl: 'viewKitchenstab.page.html',
  styleUrls: ['viewKitchenstab.page.scss']
})
export class ViewKitchensTabPage implements OnInit {

 
  
  constructor(firestore: AngularFirestore, private router: Router, public storageService: StorageService) {
    
  }

  ngOnInit(): void {

  }
}
