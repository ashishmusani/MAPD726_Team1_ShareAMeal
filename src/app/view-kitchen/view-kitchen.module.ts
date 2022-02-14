import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewKitchenPageRoutingModule } from './view-kitchen-routing.module';

import { ViewKitchenPage } from './view-kitchen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewKitchenPageRoutingModule
  ],
  declarations: [ViewKitchenPage]
})
export class ViewKitchenPageModule {}
