import {Component, Input, OnInit} from '@angular/core';
import {ModalHeader} from '../../interfaces/modal-header.interface';
import {noop} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {assign, get} from 'lodash';
import {ModalConfiguration} from '../../interfaces/modal-configuration.interface';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss']
})
export class ModalHeaderComponent implements OnInit {
  @Input() config: ModalConfiguration;

  @Input() dialogRef: MatDialogRef<any>;

  defaultHeaderConfig = {
    title: 'Modal',
    closeCallback: noop
  };

  configuration: ModalHeader;

  ngOnInit() {
    const headerConfig = get(this.config, 'header', {});
    this.configuration = assign(this.defaultHeaderConfig, headerConfig);
    console.log('DD', this.config)
    console.log('CON', this.configuration);
  }

  onClose() {
    if (this.configuration.closeCallback) {
      this.configuration.closeCallback(this.config);
    }

    this.dialogRef.close();
  }

}
