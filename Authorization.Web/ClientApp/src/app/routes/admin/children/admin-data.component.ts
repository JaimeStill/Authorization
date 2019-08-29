import {
  Component,
  OnInit
} from '@angular/core';

import { MatDialog } from '@angular/material';

import {
  ConfirmDialog,
  DataBinDialog,
  DataDialog
} from '../../../dialogs';

import { DataService } from '../../../services';
import { TableDatum } from '../../../models';

@Component({
  selector: 'admin-data-route',
  templateUrl: 'admin-data.component.html',
  providers: [DataService]
})
export class AdminDataComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public dataSvc: DataService
  ) { }

  ngOnInit() {
    this.dataSvc.getData();
  }

  addDatum = () => this.dialog.open(DataDialog, {
    data: {} as TableDatum,
    disableClose: true,
    width: '800px'
  })
  .afterClosed()
  .subscribe(res => res && this.dataSvc.getData());

  openDataBin = () => this.dialog.open(DataBinDialog, {
    autoFocus: false,
    width: '600px'
  })
  .afterClosed()
  .subscribe(() => this.dataSvc.getData());

  editDatum = (datum: TableDatum) => this.dialog.open(DataDialog, {
    data: Object.assign({} as TableDatum, datum),
    disableClose: true,
    width: '800px'
  })
  .afterClosed()
  .subscribe(res => res && this.dataSvc.getData());

  deleteDatum = (datum: TableDatum) => this.dialog.open(ConfirmDialog)
    .afterClosed()
    .subscribe(async (result) => {
      if (result) {
        const res = await this.dataSvc.toggleDatumDeleted(datum);
        res && this.dataSvc.getData();
      }
    });
}
