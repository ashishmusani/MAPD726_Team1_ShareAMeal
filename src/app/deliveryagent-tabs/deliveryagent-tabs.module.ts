import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryagentTabsPageRoutingModule } from './deliveryagent-tabs-routing.module';

import { DeliveryagentTabsPage } from './deliveryagent-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryagentTabsPageRoutingModule
  ],
  declarations: [DeliveryagentTabsPage]
})
export class DeliveryagentTabsPageModule {}
