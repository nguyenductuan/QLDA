import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from '../guard/login.guard';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListuserComponent } from './listuser/listuser.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AdminComponent } from './admin.component';
import { UserService } from '../service/user.service';
import { EdituserComponent } from './edituser/edituser.component';
import { ListproductComponent } from './listproduct/listproduct.component';
import { ListcategoryComponent } from './listcategory/listcategory.component';
import { DatepickerComponent } from '../common/datepicker/datepicker.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { OrderComponent } from './order/order.component';
import { PaginationComponent } from '../common/pagination/pagination.component';
import { CommonTableComponent } from '../common/common-table/common-table.component';

const routes: Routes = 
[
  {
    path: '', component: AdminComponent,
  
    children: [
      { path: '', component:ListuserComponent},
      {path:'adduser',component:AdduserComponent},
      {path:'edituser/:id',component:EdituserComponent},
      { path:'listuser', component:ListuserComponent},
      {path:'listuser/adduser',component:AdduserComponent},
      {path:'listuser/edituser/:id',component:EdituserComponent},
      {path:'listproduct', component: ListproductComponent},
      {path:'listproduct/addproduct', component:AddproductComponent},
      {path:'listproduct/editproduct/:id', component:EditproductComponent},
      {path:'order', component:OrderComponent},
      {path:'listcategory', component:ListcategoryComponent},
         { path: '', redirectTo: '/admin', pathMatch: 'full' }
    ]
  }
]
@NgModule({
  declarations: [
  ListuserComponent,
  PaginationComponent,
  EdituserComponent,
  ListproductComponent,
  ListcategoryComponent,
  CommonTableComponent,
  DatepickerComponent,
  AdduserComponent,
  AddproductComponent,
  EditproductComponent,
  AddcategoryComponent,
  EditcategoryComponent,
  OrderComponent
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
  
    MatSnackBarModule,
    RouterModule.forChild(routes)
  ],
  // providers: [
  //   DialogService,
  //   DynamicDialogRef
  // ],
  exports: [RouterModule]
})
export class AdminModule {}
