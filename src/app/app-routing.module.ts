import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'home', component: RegistrationComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full'},
  { path: 'update/:id', component: RegistrationComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
