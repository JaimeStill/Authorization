import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { TableCategory } from '../../models';

@Component({
  selector: 'category-card',
  templateUrl: 'category-card.component.html'
})
export class CategoryCardComponent {
  @Input() category: TableCategory;
  @Input() size = 320;
  @Output() edit = new EventEmitter<TableCategory>();
  @Output() delete = new EventEmitter<TableCategory>();
}
