import {
  Component,
  OnInit
} from '@angular/core';

import { MatDialog } from '@angular/material';
import { DataService } from '../../services';
import { TableDatum } from '../../models';
import { ConfirmDialog } from '../confirm.dialog';

@Component({
  selector: 'data-bin-dialog',
  templateUrl: 'data-bin.dialog.html',
  providers: [DataService]
})
export class DataBinDialog implements OnInit {
  constructor(
    private dialog: MatDialog,
    public dataSvc: DataService
  ) { }

  ngOnInit() {
    this.dataSvc.getDeletedData();
  }

  removeData = (data: TableDatum) => this.dialog.open(ConfirmDialog)
    .afterClosed()
    .subscribe(async (result) => {
      if (result) {
        const res = await this.dataSvc.removeDatum(data);
        res && this.dataSvc.getDeletedData();
      }
    });

  restoreData = async (data: TableDatum) => {
    const res = await this.dataSvc.toggleDatumDeleted(data);
    res && this.dataSvc.getDeletedData();
  }
}
