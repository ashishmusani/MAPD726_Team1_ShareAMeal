import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCartsPageRoutingModule } from './view-carts-routing.module';

import { ViewCartsPage } from './view-carts.page';
import { ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ViewCartsPageRoutingModule
  ],
  declarations: [ViewCartsPage]
})
export class ViewCartsPageModule {}
