import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent} from '../../components/person/person.component';


const routes: Routes = [
  { path: 'person', component: PersonComponent }
];
@NgModule({  
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
