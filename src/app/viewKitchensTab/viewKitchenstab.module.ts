import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewKitchensTabPage } from './viewKitchenstab.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ViewKitchensTabPageRoutingModule } from './viewKitchenstab-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ViewKitchensTabPageRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  declarations: [ViewKitchensTabPage]
})
export class viewKitchensTabPageModule {}
