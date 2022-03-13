import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddkitchenComponent } from '../add-kitchen/addkitchen.component';
import { AddItemComponent } from '../additem/additem.component';
import { ViewKitchensTabPage } from './viewKitchenstab.page';

const routes: Routes = [
  {
    path: '',
    component: ViewKitchensTabPage,
  },
  // {
  //   path: 'add',
  //   component: AddkitchenComponent,
  // },
  // {
  //   path: 'additem',
  //   component: AddItemComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewKitchensTabPageRoutingModule {}
