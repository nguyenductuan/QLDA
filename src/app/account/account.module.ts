import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  }
]

@NgModule({
  declarations: [AccountComponent, LoginComponent],
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccountModule { }
