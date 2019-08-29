import {
  Component,
  OnInit
} from '@angular/core';

import { MatDialog } from '@angular/material';

import {
  CategoryBinDialog,
  CategoryDialog,
  ConfirmDialog
} from '../../../dialogs';

import { DataService } from '../../../services';
import { TableCategory } from '../../../models';

@Component({
  selector: 'admin-category-route',
  templateUrl: 'admin-category.component.html',
  providers: [DataService]
})
export class AdminCategoryComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public dataSvc: DataService
  ) { }

  ngOnInit() {
    this.dataSvc.getCategories();
  }

  addCategory = () => this.dialog.open(CategoryDialog, {
    data: {} as TableCategory,
    disableClose: true,
    width: '800px'
  })
  .afterClosed()
  .subscribe(res => res && this.dataSvc.getCategories());

  openCategoryBin = () => this.dialog.open(CategoryBinDialog, {
    autoFocus: false,
    width: '600px'
  })
  .afterClosed()
  .subscribe(() => this.dataSvc.getCategories());

  editCategory = (category: TableCategory) => this.dialog.open(CategoryDialog, {
    data: Object.assign({} as TableCategory, category),
    disableClose: true,
    width: '800px'
  })
  .afterClosed()
  .subscribe(res => res && this.dataSvc.getCategories());

  deleteCategory = (category: TableCategory) => this.dialog.open(ConfirmDialog)
    .afterClosed()
    .subscribe(async (result) => {
      if (result) {
        const res = await this.dataSvc.toggleCategoryDeleted(category);
        res && this.dataSvc.getCategories();
      }
    });
}
