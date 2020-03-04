import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {UserRegistrationFormDialogComponent} from './components/user-registration-form-dialog/user-registration-form-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formPayload;

  constructor(
    public dialog: MatDialog,
  ) {}

  openModal() {
    this.dialog.open(UserRegistrationFormDialogComponent, {
      width: '60vw',
      panelClass: 'no-padding-dialog',
      data: {
        header: {
          title: 'User Registration Form'
        },
        content: {
          user: {}
        },
        footer: {
          primaryButtonLabel: 'Save',
          primaryButtonCallback: this.submitUserRegistrationForm,
          primaryButtonValidation: this.isUserRegistrationFormValid,
        }
      }
    });
  }

  isUserRegistrationFormValid = (form: FormGroup) => {
    return true;
    // return form.valid;
  }

  submitUserRegistrationForm = (form: FormGroup) => {
    // this.formPayload = form.value;
    // form.reset();
    this.dialog.closeAll();
  }
}
