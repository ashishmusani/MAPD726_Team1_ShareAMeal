import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsInKitchensPage } from './items-in-kitchens.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsInKitchensPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsInKitchensPageRoutingModule {}
