import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCartsPage } from './view-carts.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCartsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCartsPageRoutingModule {}
