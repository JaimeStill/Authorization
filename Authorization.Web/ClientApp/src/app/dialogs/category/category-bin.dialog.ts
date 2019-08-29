import {
  Component,
  OnInit
} from '@angular/core';

import { MatDialog } from '@angular/material';
import { DataService } from '../../services';
import { TableCategory } from '../../models';
import { ConfirmDialog } from '../confirm.dialog';

@Component({
  selector: 'category-bin-dialog',
  templateUrl: 'category-bin.dialog.html',
  providers: [DataService]
})
export class CategoryBinDialog implements OnInit {
  constructor(
    private dialog: MatDialog,
    public dataSvc: DataService
  ) { }

  ngOnInit() {
    this.dataSvc.getDeletedCategories();
  }

  removeCategory = (category: TableCategory) => this.dialog.open(ConfirmDialog)
    .afterClosed()
    .subscribe(async (result) => {
      if (result) {
        const res = await this.dataSvc.removeCategory(category);
        res && this.dataSvc.getDeletedCategories();
      }
    });

  restoreCategory = async (category: TableCategory) => {
    const res = await this.dataSvc.toggleCategoryDeleted(category);
    res && this.dataSvc.getDeletedCategories();
  }
}
