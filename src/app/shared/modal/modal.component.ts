import {Component, ContentChild, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @ContentChild('header', { static: false }) headerTemplate: TemplateRef<any>;
  @ContentChild('content', { static: false }) contentTemplate: TemplateRef<any>;
  @ContentChild('footer', { static: false }) footerTemplate: TemplateRef<any>;

  @Input() dialogRef;
  @Input() payload;
  @Input() config;

  get context() { return { $implicit: this.config, payload: this.payload }; }
}
