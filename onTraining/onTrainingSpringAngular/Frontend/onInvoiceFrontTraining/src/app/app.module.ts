import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { RoutingModule } from './modules/routing/routing.module';


@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    PersonFormComponent,
    PersonDetailComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
