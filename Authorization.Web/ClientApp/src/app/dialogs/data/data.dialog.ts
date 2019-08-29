import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

import { DataService } from '../../services';
import { TableDatum } from '../../models';

@Component({
  selector: 'data-dialog',
  templateUrl: 'data.dialog.html',
  providers: [DataService]
})
export class DataDialog implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DataDialog>,
    public dataSvc: DataService,
    @Inject(MAT_DIALOG_DATA) public datum: TableDatum
  ) { }

  ngOnInit() {
    this.dataSvc.getCategories();
  }

  saveDatum = async () => {
    this.datum.tableCategory = null;

    const res = this.datum.id ?
      await this.dataSvc.updateDatum(this.datum) :
      await this.dataSvc.addDatum(this.datum);

    res && this.dialogRef.close(true);
  }
}
