import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-page/login-page.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'user', component: UserPageComponent },

  { path: 'user-page/:id', component: UserPageComponent },


  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'admin/edit/:id', component: EditUserComponent }
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
