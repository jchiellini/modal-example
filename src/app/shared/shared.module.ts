import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MaterialModule} from './material/material.module';

@NgModule({
  declarations: [ModalComponent, ModalHeaderComponent, ModalFooterComponent, FormFieldComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    FormFieldComponent,
    MaterialModule,
    FlexLayoutModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
