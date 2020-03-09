import {Component, ContentChild, Input, TemplateRef} from '@angular/core';
import {ModalConfiguration} from '../src/app/interfaces/modal-configuration.interface';
import {MatDialogRef} from '@angular/material/dialog';

// region Components
@Component({
  selector: 'app-modal',
  template: '<div></div>'
})
class MockModalComponent {
  @ContentChild('header', { static: false }) headerTemplate: TemplateRef<any>;
  @ContentChild('content', { static: false }) contentTemplate: TemplateRef<any>;
  @ContentChild('footer', { static: false }) footerTemplate: TemplateRef<any>;

  @Input() dialogRef;
  @Input() payload;
  @Input() config;
}

@Component({
  selector: 'app-modal-header',
  template: '<div></div>'
})
class MockModalHeaderComponent {
  @Input() config: ModalConfiguration;
  @Input() dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-modal-footer',
  template: '<div></div>'
})
class MockModalFooterComponent {
  @Input() config: ModalConfiguration = {};
  @Input() payload: any = {};

  @Input() dialogRef: MatDialogRef<any>;
}
// endregion

export default {
  MockModalComponent,
  MockModalFooterComponent,
  MockModalHeaderComponent
};
