import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { RoutingModule } from './modules/routing/routing.module';
import {ToasterModule} from 'angular5-toaster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PersonService } from './services/person.service';
import { DatatableComponent } from './components/datatable/datatable.component';
import { PersonViewComponent } from './components/person-view/person-view.component';
import { PersonInvoiceListComponent } from './components/person-invoice-list/person-invoice-list.component';
import { InvoiceService } from './services/invoice.service';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { ProductService } from './services/product.service';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@auth0/angular-jwt'
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    PersonFormComponent,
    PersonDetailComponent,
    DatatableComponent,
    PersonViewComponent,
    PersonInvoiceListComponent,
    InvoiceFormComponent,
    InvoiceDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ToasterModule,
    BrowserAnimationsModule,
    NgHttpLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter : function(){
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['localhost:8080']
      }
    })
  ],
  providers: [
    PersonService, 
    InvoiceService, 
    ProductService, 
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
