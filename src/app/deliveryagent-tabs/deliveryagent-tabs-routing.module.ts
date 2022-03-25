import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewOrdersComponent } from '../view-orders/view-orders.component';
import { SettingsComponent } from '../settings/settings.component';
import { DeliveryagentTabsPage } from './deliveryagent-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryagentTabsPage,
    children: [
      {
        path: 'orders',
        component: ViewOrdersComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: '',
        redirectTo: '/deliveryagent/orders',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryagentTabsPageRoutingModule {}
