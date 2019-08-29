import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

import {
  Component,
  Inject
} from '@angular/core';

import { DataService } from '../../services';
import { TableCategory } from '../../models';

@Component({
  selector: 'category-dialog',
  templateUrl: 'category.dialog.html',
  providers: [DataService]
})
export class CategoryDialog {
  constructor(
    private dialogRef: MatDialogRef<CategoryDialog>,
    public dataSvc: DataService,
    @Inject(MAT_DIALOG_DATA) public category: TableCategory
  ) { }

  saveCategory = async () => {
    const res = this.category.id ?
      await this.dataSvc.updateCategory(this.category) :
      await this.dataSvc.addCategory(this.category);

    res && this.dialogRef.close(true);
  }
}
