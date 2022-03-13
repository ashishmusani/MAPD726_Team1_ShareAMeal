import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCartsPageRoutingModule } from './view-carts-routing.module';

import { ViewCartsPage } from './view-carts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCartsPageRoutingModule
  ],
  declarations: [ViewCartsPage]
})
export class ViewCartsPageModule {}
