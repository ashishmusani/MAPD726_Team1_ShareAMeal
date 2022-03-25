import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from '../settings/settings.component';
import { ViewOrdersComponent } from '../view-orders/view-orders.component';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'kitchen',
        loadChildren: () => import('../kitchenTab/tab1.module').then(m => m.Tab1PageModule)
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
        redirectTo: '/cook/kitchen',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/kitchen',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
