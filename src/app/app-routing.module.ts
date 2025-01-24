import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './guard/login.guard';


const routes: Routes = [
  {path:'',component: HomeComponent, canActivate:[LoginGuard]},
  {path:'home', component: HomeComponent,canActivate:[LoginGuard]},
  { path:'account', loadChildren:()=> import('./account/account.module').then((m) => m.AccountModule)},
  { path:'users', loadChildren:()=> import('./users/users.module').then((m) => m.UsersModule)},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
