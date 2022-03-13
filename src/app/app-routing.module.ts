import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ItemDetailsComponent } from './item-details/item-details.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  {
    path: 'cook',
    loadChildren: () => import('./cookTabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./customerTabs/tabs.module').then(m => m.CustomerTabsPageModule)
  },
  {
    path: 'items-in-kitchens/:userId',
    loadChildren: () => import('./items-in-kitchens/items-in-kitchens.module').then( m => m.ItemsInKitchensPageModule)
  },
  {
    path: 'items-details/:kitchenId/:itemId',
    component: ItemDetailsComponent
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'view-carts/:userId',
    loadChildren: () => import('./view-carts/view-carts.module').then( m => m.ViewCartsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
