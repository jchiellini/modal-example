import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-registration-form-dialog',
  templateUrl: './user-registration-form-dialog.component.html',
  styleUrls: ['./user-registration-form-dialog.component.scss']
})
export class UserRegistrationFormDialogComponent implements OnInit {

  userRegistrationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserRegistrationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public config: any
  ) {}

  ngOnInit(): void {
  }

}
