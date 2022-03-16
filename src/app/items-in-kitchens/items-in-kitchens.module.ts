import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemsInKitchensPageRoutingModule } from './items-in-kitchens-routing.module';

import { ItemsInKitchensPage } from './items-in-kitchens.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsInKitchensPageRoutingModule
  ],
  declarations: [ItemsInKitchensPage]
})
export class ItemsInKitchensPageModule {}
