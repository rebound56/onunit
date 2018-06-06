import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent} from '../../components/person/person.component';
import { ListPersonComponent } from '../../components/list-person/list-person.component';


const routes: Routes = [
  { path: 'person/update/:id', component: PersonComponent },
  { path: 'person/create', component: PersonComponent },
  { path: 'person', component: ListPersonComponent }

];
@NgModule({  
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
