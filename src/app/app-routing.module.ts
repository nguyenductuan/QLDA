import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './guard/login.guard';



const routes: Routes = [
  {path:'',component: HomeComponent, canActivate:[LoginGuard]},
  {path:'home', loadChildren:() => import('./home/home.module').then((m) => m.HomeModule)},
  { path:'account', loadChildren:()=> import('./account/account.module').then((m) => m.AccountModule)},
  { path:'admin', loadChildren:()=> import('./admin/admin.module').then((m) => m.AdminModule)},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
