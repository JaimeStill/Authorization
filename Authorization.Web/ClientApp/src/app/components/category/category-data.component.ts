import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import {
  TableCategory,
  TableDatum
} from '../../models';

import { DataService } from '../../services';

@Component({
  selector: 'category-data',
  templateUrl: 'category-data.component.html',
  providers: [DataService]
})
export class CategoryDataComponent implements OnInit {
  @Input() category: TableCategory;
  @Input() editable = true;
  @Input() dataEditable = true;
  @Input() editIcon = 'edit';
  @Input() deleteIcon = 'delete_outline';
  @Output() edit = new EventEmitter<TableCategory>();
  @Output() delete = new EventEmitter<TableCategory>();
  @Output() editData = new EventEmitter<TableDatum>();
  @Output() deleteData = new EventEmitter<TableDatum>();

  constructor(
    public dataSvc: DataService
  ) { }

  ngOnInit() {
    this.category.id && this.dataSvc.getDataByCategory(this.category.id);
  }
}
