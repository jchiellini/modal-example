import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Form, FormGroup} from '@angular/forms';
import {UserRegistrationFormDialogComponent} from './components/user-registration-form-dialog/user-registration-form-dialog.component';
import {CustomDialogComponent} from './components/custom-dialog/custom-dialog.component';
import {MessageDialogComponent} from './components/message-dialog/message-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formPayload;
  customResponse = '';

  constructor(
    public dialog: MatDialog,
  ) {}

  // region Form Modal
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
          disableSecondaryButtonClose: true,
          secondaryButtonCallback: this.cancellationCheck,
          primaryButtonCallback: this.submitUserRegistrationForm,
          primaryButtonValidation: this.isUserRegistrationFormValid,
        }
      }
    });
  }

  cancellationCheck = (payload, config, dialogRef) => {
    if (payload.dirty) {
      this.dialog.open(MessageDialogComponent, {
        width: '40vw',
        panelClass: 'no-padding-dialog',
        data: {
          header: {
            title: 'Cancellation'
          },
          content: {
            payload,
            message: 'Are you sure you want to cancel? Any information in the form will not be saved.'
          },
          footer: {
            secondaryButtonLabel: 'No',
            primaryButtonCallback: this.onCancel,
            primaryButtonLabel: 'Yes'
          }
        }
      });
    } else {
      dialogRef.close();
    }
  }

  // NOTE: Arrow functions must be used to pass as a reference. This ensures that it will be fired in this scope
  isUserRegistrationFormValid = (form: FormGroup) => {
    return form.valid;
  }

  submitUserRegistrationForm = (form: FormGroup) => {
    this.formPayload = form.value;
    form.reset();
    this.dialog.closeAll();
  }

  onCancel = () => {
    this.dialog.closeAll();
  }

  // endregion

  // region Custom Modal
  openCustomModal() {
    this.dialog.open(CustomDialogComponent, {
      width: '60vw',
      panelClass: 'no-padding-dialog',
      data: {
        header: {
          title: 'Custom Form'
        },
        content: {
          message: 'This modal demonstrates overriding the default templates. Are you enjoying the tutorial?'
        },
        footer: {
          responseCallback: this.handleCustomResponseCallback
        }
      }
    });
  }

  handleCustomResponseCallback = (response) => {
    this.customResponse = response;
    this.dialog.closeAll();
  }
  // endregion
}
