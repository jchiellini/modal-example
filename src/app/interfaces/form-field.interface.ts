import {ValidatorFn} from '@angular/forms';

export interface FormField {
  id: string;
  type: string;
  label?: string;
  required?: boolean;
  icon?: string;
  disabled?: any;
  placeholder?: string;
  tooltip?: string | any;
  options?: any;
  width?: number;
  rows?: number;
  min?: any;
  max?: any;
  valueProperty?: string;
  displayProperty?: string;
  disableTooltip?: boolean;
  normalize?: any;
  validators?: ValidatorFn | ValidatorFn[];
  displayedErrors?: object;
  hint?: string;
  class?: string;
}
