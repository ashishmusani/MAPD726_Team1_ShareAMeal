import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ItemDetailsComponent } from './item-details/item-details.component'
import { CheckoutComponent } from './checkout/checkout.component'
import { UpdateItemComponent } from './update-item/update-item.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

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
    path: 'view-carts/:userId/:kitchenId',
    loadChildren: () => import('./view-carts/view-carts.module').then( m => m.ViewCartsPageModule)
  },
  {
    path: 'checkout/:userId/:kitchenId',
    component: CheckoutComponent
  },
  {
    path: 'update-item/:kitchenId/:itemId',
    component: UpdateItemComponent
  },
  {
    path: 'order-details/:orderId/:userType',
    component: OrderDetailsComponent
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'deliveryagent',
    loadChildren: () => import('./deliveryagent-tabs/deliveryagent-tabs.module').then( m => m.DeliveryagentTabsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
