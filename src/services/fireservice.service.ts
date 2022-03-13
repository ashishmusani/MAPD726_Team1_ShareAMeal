import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from './storage-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root'
})
export class FireserviceService {
  private locationUpload = "uploads/";
  constructor(public firestore: AngularFirestore, public auth: AngularFireAuth, public storageService: StorageService,
    public angularFireStorage: AngularFireStorage) {
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

  async storeImage(imageData: any, imageName) {
    try {
      return new Promise((resolve, reject) => {
        const pictureRef = this.angularFireStorage.ref(this.locationUpload + imageName);
        pictureRef
          .put(imageData)
          .then(function () {
            pictureRef.getDownloadURL().subscribe((url: any) => {
              resolve(url);
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (e) {}
  }

  getKitchen(id){
    return this.firestore.collection("kitchens").doc(id).get()
  }

  changeKitchenStatus(id: String, isOpen: boolean){
    return this.firestore.collection("kitchens").doc(id.toString()).update({kitchenIsOpen: isOpen})
  }

  getItemsInKitchen(kitchenId){
    return this.firestore.collection("kitchens").doc(kitchenId).collection("items").get();
  }

  getItem(kitchenId,itemId)
  {
    return this.firestore.collection("kitchens").doc(kitchenId).collection("items").doc(itemId).get();
  }

  getCartByUserId(uid){
    return this.firestore.collection("carts", ref => ref.where("userId", "==", uid)).get();
  }

  getCartByUserIdNKitchenId(uid, kitchenId){
    return this.firestore.collection("carts", ref => ref.where("userId", "==", uid).where("kitchenId","==",kitchenId)).get();
  }

  getItemsInCart(cartId){
    return this.firestore.collection("carts").doc(cartId).collection("items").get();
  }

  addToCart(userId){
    return this.firestore.collection("carts").add(userId)
  }

  addItemsToCart(data, cartId){
      if(cartId){
        return this.firestore.collection("carts").doc(cartId).collection("items").add(data)
      }
  }
}
