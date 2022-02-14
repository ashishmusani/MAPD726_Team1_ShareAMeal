import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FireserviceService {

  constructor(public firestore: AngularFirestore, public auth: AngularFireAuth) {

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
    return this.firestore.collection("users").doc(data.uid).valueChanges();
  }

  addNewKitchen(data) {
    return this.firestore.collection("kitchens").doc().set(data)
  }

}
