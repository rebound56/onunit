import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from '../../components/person-form/person-form.component';
import { PersonListComponent } from '../../components/person-list/person-list.component';
import { PersonDetailComponent } from '../../components/person-detail/person-detail.component';
import { InvoiceFormComponent } from '../../components/invoice-form/invoice-form.component';
import { InvoiceDetailComponent } from '../../components/invoice-detail/invoice-detail.component';
import { LoginComponent } from '../../components/login/login.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [   
  { path: 'person/form/:id', component: PersonFormComponent, canActivate : [GuardService] },
  { path: 'person/detail/:id', component: PersonDetailComponent, canActivate : [GuardService] },  
  { path: 'person/form', component: PersonFormComponent, canActivate : [GuardService] },
  { path: 'invoice/:idPerson/form/:id', component: InvoiceFormComponent, canActivate : [GuardService] },
  { path: 'invoice/:idPerson/detail/:id', component: InvoiceDetailComponent, canActivate : [GuardService] },
  { path: 'invoice/:idPerson/form', component: InvoiceFormComponent, canActivate : [GuardService] },
  { path: 'person/list', component: PersonListComponent, canActivate : [GuardService] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers : [
    GuardService
  ]
})
export class RoutingModule { }
