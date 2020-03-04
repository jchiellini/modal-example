import {Component, Input, TemplateRef} from '@angular/core';
import {ModalHeader} from '../../interfaces/modal-header.interface';
import {ModalFooter} from '../../interfaces/modal-footer.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() headerTemplate: TemplateRef<ModalHeader>;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() footerTemplate: TemplateRef<ModalFooter>;
  @Input() dialogRef;
  @Input() payload;
  @Input() config;

  get context() { return { $implicit: this.config, payload: this.payload }; }
}
