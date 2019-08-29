import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { TableDatum } from '../../models';

@Component({
  selector: 'data-card',
  templateUrl: 'data-card.component.html'
})
export class DataCardComponent {
  @Input() data: TableDatum;
  @Input() size = 320;
  @Input() editable = true;
  @Input() editIcon = 'edit';
  @Input() deleteIcon = 'delete_outline';
  @Output() edit = new EventEmitter<TableDatum>();
  @Output() delete = new EventEmitter<TableDatum>();
}
