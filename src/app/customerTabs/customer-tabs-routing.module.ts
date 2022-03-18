import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from '../settings/settings.component';
import { ViewOrdersComponent } from '../view-orders/view-orders.component';
import { CustomerTabsPage } from './customer-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerTabsPage,
    children: [
      {
        path: 'kitchens',
        loadChildren: () => import('../viewKitchensTab/viewKitchenstab.module').then(m => m.viewKitchensTabPageModule)
      },
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
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CustomerTabsPageRoutingModule {}
