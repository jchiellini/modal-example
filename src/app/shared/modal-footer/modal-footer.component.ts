import {Component, Input, OnInit} from '@angular/core';
import {ModalFooter} from '../../interfaces/modal-footer.interface';
import {ModalConfiguration} from '../../interfaces/modal-configuration.interface';
import {assign, get} from 'lodash';

@Component({
  selector: 'app-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss']
})
export class ModalFooterComponent implements OnInit {
  @Input() config: ModalConfiguration = {};
  @Input() payload: any = {};
  @Input() dialogRef;

  configuration: ModalFooter;

  defaultFooterConfig: ModalFooter = {
    secondaryButtonVisible: true,
    secondaryButtonLabel: 'Cancel',
    secondaryButtonValidation: () => true,
    primaryButtonVisible: true,
    primaryButtonLabel: 'Save',
    primaryButtonValidation: () => true,
    footerVisible: true
  };

  ngOnInit(): void {
    const footerConfig = get(this.config, 'footer', {});
    this.configuration = assign(this.defaultFooterConfig, footerConfig);
  }

  onSecondaryButtonClick() {
    if (!this.configuration.disableSecondaryButtonClose) {
      this.dialogRef.close();
    }

    if (this.configuration.secondaryButtonCallback) {
      this.configuration.secondaryButtonCallback(this.payload, this.config, this.dialogRef);
    }
  }

  onPrimaryButtonClick() {
    if (this.configuration.primaryButtonCallback) {
      this.configuration.primaryButtonCallback(this.payload, this.config, this.dialogRef);
    }
  }

}
