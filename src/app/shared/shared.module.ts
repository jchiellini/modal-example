import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ModalComponent, ModalHeaderComponent, ModalFooterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  exports: [ModalComponent, ModalHeaderComponent, ModalFooterComponent]
})
export class SharedModule { }
