import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppMaterialModule} from './app-material/app-material.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { MainContentComponent } from './component/main-content/main-content.component';
import { MenuDrawerComponent } from './component/menu-drawer/menu-drawer.component';
import { LoginDialogComponent } from './component/login-dialog/login-dialog.component';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductBidSearchComponent } from './component/product-bid-search/product-bid-search.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LogoutComponent } from './component/logout/logout.component';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './service/share/token.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainContentComponent,
    MenuDrawerComponent,
    LoginDialogComponent,
    ProductBidSearchComponent,
    DashboardComponent,
    LogoutComponent,
    BreadcrumbComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
