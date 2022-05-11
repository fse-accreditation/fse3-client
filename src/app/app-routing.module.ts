import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component'
import { ProductBidSearchComponent } from './component/product-bid-search/product-bid-search.component'
import {LogoutComponent} from './component/logout/logout.component'
const routes: Routes = [
  { path: '', redirectTo: '/product-bid/search', pathMatch: 'full' },
 // { path: 'dashboard', component: DashboardComponent },
  { path: 'product-bid/search', component: ProductBidSearchComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
