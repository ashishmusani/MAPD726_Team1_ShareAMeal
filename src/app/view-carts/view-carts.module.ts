import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ViewCartsPageRoutingModule } from './view-carts-routing.module';

import { ViewCartsPage } from './view-carts.page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ViewCartsPageRoutingModule
  ],
  declarations: [ViewCartsPage]
})
export class ViewCartsPageModule {}
