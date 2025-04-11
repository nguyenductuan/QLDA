import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './common/confirmation-dialog/confirmation-dialog.component';
import { UserDetailDialogComponent } from './common/user-detail-dialog/user-detail-dialog.component';
import { ConfirmationDialogDeleteComponent } from './common/confirmation-dialog-delete/confirmation-dialog-delete.component';

import { ConfirmationDialogEditComponent } from './common/confirmation-dialog-edit/confirmation-dialog-edit.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ProductDetailDialogComponent } from './common/product-detail-dialog/product-detail-dialog.component';



@NgModule({
  declarations: [
    AppComponent, ConfirmationDialogComponent, ConfirmationDialogDeleteComponent, ConfirmationDialogEditComponent, AdminComponent, HomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
