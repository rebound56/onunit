import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PersonComponent } from './components/person/person.component';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';

import {ReactiveFormsModule} from "@angular/forms";
import { ListPersonComponent } from './components/list-person/list-person.component';
import { PersonService } from './services/person.service';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module'
import {ToasterModule} from 'angular5-toaster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DatatableComponent } from './components/datatable/datatable.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    ListPersonComponent,
    DatatableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule,
    ToasterModule,
    BrowserAnimationsModule
  ],
  providers: [
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
