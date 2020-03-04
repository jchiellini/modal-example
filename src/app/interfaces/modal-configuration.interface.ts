import {ModalFooter} from './modal-footer.interface';
import {ModalHeader} from './modal-header.interface';

export interface ModalConfiguration {
  header?: ModalHeader;
  content?: any;
  footer?: ModalFooter;
}
