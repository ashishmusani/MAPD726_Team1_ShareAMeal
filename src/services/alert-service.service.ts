import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }


  public async genericAlert(header: String, message: string) {
    const alert = await this.alertController.create({
      header: header.toString(),
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]

    });
    await alert.present();
    let result = await alert.onDidDismiss();
  }
}