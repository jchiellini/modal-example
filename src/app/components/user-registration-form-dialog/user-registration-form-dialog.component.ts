import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormField} from '../../interfaces/form-field.interface';
import {each} from 'lodash';

@Component({
  selector: 'app-user-registration-form-dialog',
  templateUrl: './user-registration-form-dialog.component.html',
  styleUrls: ['./user-registration-form-dialog.component.scss']
})
export class UserRegistrationFormDialogComponent implements OnInit {
  @Input() field: FormField;
  @Input() form: FormGroup;

  formPayload: any;
  userRegistrationForm: FormGroup = new FormGroup({});

  userRegistrationFormConfig: FormField[] = [
    {
      id: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'First Name',
      required: true,
      validators: [Validators.required],
      width: 50
    },
    {
      id: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Last Name',
      required: true,
      validators: [Validators.required],
      width: 50
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<UserRegistrationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public config: any
  ) {}

  ngOnInit(): void {
    this.userRegistrationForm = this.initializeForm(this.userRegistrationFormConfig);
  }

  initializeForm(config: FormField[], values = {}) {
    const formConfig = {};

    each(config, (field: FormField) => {
      const control = new FormControl(values[field.id] || '');

      if (field.validators) {
        control.setValidators(field.validators);
      }

      if (field.disabled) {
        control.disable();
      }

      formConfig[field.id] = control;
    });

    return new FormGroup(formConfig);
  }

}
