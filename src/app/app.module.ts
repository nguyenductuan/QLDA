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
import { SearchInputComponent } from './common/search-input/search-input.component';

@NgModule({
  declarations: [
    AppComponent, ConfirmationDialogComponent, ConfirmationDialogDeleteComponent
  ],
  imports: [
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
