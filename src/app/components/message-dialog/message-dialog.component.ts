import {Component, Inject, OnInit} from '@angular/core';
import {UserRegistrationFormDialogComponent} from '../user-registration-form-dialog/user-registration-form-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {get} from 'lodash';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {
  configuration;

  constructor(
    public dialogRef: MatDialogRef<UserRegistrationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public config: any
  ) { }

  ngOnInit(): void {
    this.configuration = get(this.config, 'content', {});
  }

}
