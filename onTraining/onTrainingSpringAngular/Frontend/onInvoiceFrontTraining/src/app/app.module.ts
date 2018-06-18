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
import { HttpClientModule } from '@angular/common/http';
import { PersonService } from './services/person.service';
import { DatatableComponent } from './components/datatable/datatable.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    PersonFormComponent,
    PersonDetailComponent,
    DatatableComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ToasterModule,
    BrowserAnimationsModule,
    NgHttpLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
