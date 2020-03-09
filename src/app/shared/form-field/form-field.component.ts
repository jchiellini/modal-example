import {Component, Input, OnInit} from '@angular/core';
import {FormField} from '../../interfaces/form-field.interface';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {

  @Input() field: FormField;
  @Input() form: FormGroup;
  tooltip = '';

  constructor() { }

  ngOnInit(): void {

  }

}
