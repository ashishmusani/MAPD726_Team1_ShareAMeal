import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewKitchenPage } from './view-kitchen.page';

const routes: Routes = [
  {
    path: '',
    component: ViewKitchenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewKitchenPageRoutingModule {}
