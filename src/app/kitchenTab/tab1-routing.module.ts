import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddkitchenComponent } from '../add-kitchen/addkitchen.component';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'add',
    component: AddkitchenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
