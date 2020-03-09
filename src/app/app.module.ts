import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationFormDialogComponent } from './components/user-registration-form-dialog/user-registration-form-dialog.component';
import { CustomDialogComponent } from './components/custom-dialog/custom-dialog.component';
import { SharedModule } from './shared/shared.module';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormDialogComponent,
    CustomDialogComponent,
    MessageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UserRegistrationFormDialogComponent, CustomDialogComponent, MessageDialogComponent],
})
export class AppModule { }
