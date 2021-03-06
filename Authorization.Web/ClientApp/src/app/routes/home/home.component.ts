import {
  Component,
  OnInit
} from '@angular/core';

import { MatDialog } from '@angular/material';
import { DataService } from '../../services';

import {
  CategoryBinDialog,
  CategoryDialog,
  ConfirmDialog,
  DataBinDialog,
  DataDialog
} from '../../dialogs';

import {
  TableCategory,
  TableDatum
} from '../../models';

@Component({
  selector: 'home-route',
  templateUrl: 'home.component.html',
  providers: [DataService]
})
export class HomeComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public dataSvc: DataService
  ) { }

  ngOnInit() {
    this.dataSvc.getCategories();
  }

  openCategoryBin = () => this.dialog.open(CategoryBinDialog, {
    disableClose: true,
    autoFocus: false,
    width: '600px'
  })
  .afterClosed()
  .subscribe(() => this.dataSvc.getCategories());

  openDataBin = () => this.dialog.open(DataBinDialog, {
    disableClose: true,
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

  editData = (data: TableDatum) => this.dialog.open(DataDialog, {
    data: Object.assign({} as TableDatum, data),
    disableClose: true,
    width: '800px'
  })
  .afterClosed()
  .subscribe(res => res && this.dataSvc.getCategories());

  deleteData = (data: TableDatum) => this.dialog.open(ConfirmDialog)
    .afterClosed()
    .subscribe(async (result) => {
      if (result) {
        const res = await this.dataSvc.toggleDatumDeleted(data);
        res && this.dataSvc.getCategories();
      }
    });
}
