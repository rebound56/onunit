import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from '../../components/person-form/person-form.component';
import { PersonListComponent } from '../../components/person-list/person-list.component';
import { PersonDetailComponent } from '../../components/person-detail/person-detail.component';
import { InvoiceFormComponent } from '../../components/invoice-form/invoice-form.component';

const routes: Routes = [
  { path: 'person/form/:id', component: PersonFormComponent },
  { path: 'person/detail/:id', component: PersonDetailComponent },  
  { path: 'person/form', component: PersonFormComponent },
  { path: 'invoice/:idPerson/form/:id', component: InvoiceFormComponent },
  { path: 'invoice/:idPerson/form', component: InvoiceFormComponent },
  { path: 'person/list', component: PersonListComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
