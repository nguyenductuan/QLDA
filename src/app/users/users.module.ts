import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../service/user.service';
import { LoginGuard } from '../guard/login.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DatepickerComponent } from '../common/datepicker/datepicker.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { AdduserComponent } from './adduser/adduser.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EdituserComponent } from './edituser/edituser.component';

import { UserDetailDialogComponent } from '../common/user-detail-dialog/user-detail-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchInputComponent } from '../common/search-input/search-input.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';


const routes: Routes = [
  {
    path: '', component: UsersComponent, canActivate: [LoginGuard],
    children: [
      { path: '', component: UserListComponent },
      { path:'adduser', component: AdduserComponent },
      { path:'edituser/:id', component: EdituserComponent },


      { path: '', redirectTo: '/user', pathMatch: 'full' }
    ]
  }
]
@NgModule({ // xem cau truc doan nay
  declarations: [UsersComponent,
     UserListComponent,
     DatepickerComponent,
      UserDetailDialogComponent,
       AdduserComponent,
        EdituserComponent,SearchInputComponent

       ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    CalendarModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    DividerModule,
    FormsModule,
    MatSnackBarModule, DividerModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    DialogService,
    DynamicDialogRef
  ],
  exports: [RouterModule]
})
export class UsersModule {
  constructor(public app: UserService) { }
}
