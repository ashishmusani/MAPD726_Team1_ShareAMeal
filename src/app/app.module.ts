import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment'
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddkitchenComponent } from './add-kitchen/addkitchen.component';
import { AddItemComponent } from './additem/additem.component';
import { ViewKitchensTabPage } from './viewKitchensTab/viewKitchenstab.page';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AddkitchenComponent,
    AddItemComponent,
    ViewKitchensTabPage
  ],
  entryComponents: [
    LoginComponent
  ],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebaseConfig, 'ShareAMeal'),
            FormsModule,
            IonicStorageModule.forRoot(),
            AngularFireStorageModule
          ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
