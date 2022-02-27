import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class FireserviceService {

  constructor(public firestore: AngularFirestore, public auth: AngularFireAuth, public storageService: StorageService) {
  }

  loginWithEmail(data) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  signup(data) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  saveDetails(data) {
    return this.firestore.collection("users").doc(data.uid).set(data)
  }

  getDetails(data){
    return this.firestore.collection("users").doc(data.uid).get();
  }

  addNewKitchen(data) {
    return this.firestore.collection("kitchens").add(data)
  }
  
  getKitchens(){
    return this.firestore.collection("kitchens").get();
  }

  addItem(data){
    return this.storageService.get('kitchenId').then(id => {
      console.log("kitchen id in add item call: ", id)
      if(id){
        return this.firestore.collection("kitchens").doc(id).collection("items").add(data)
      }
    })
  }

  getKitchenByUserId(uid){
    return this.firestore.collection("kitchens", ref => ref.where("userId", "==", uid)).get();
  }

  getCurrentUser(){
    return this.auth.currentUser;
  }

}
