import {
  Component,
  OnInit
} from '@angular/core';

import { MatDialog } from '@angular/material';

import {
  BannerService,
  SidepanelService,
  ThemeService,
  UserService
} from './services';

import { UserSettingsDialog } from './dialogs';
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public banner: BannerService,
    public sidepanel: SidepanelService,
    public theme: ThemeService,
    public identity: UserService
  ) { }

  ngOnInit() {
    this.banner.getConfig();
    this.identity.syncUser();
  }

  viewSettings = (user: User) => this.dialog.open(UserSettingsDialog, {
    data: Object.assign({}, user),
    width: '600px',
    disableClose: true
  })
  .afterClosed()
  .subscribe(() => this.identity.syncUser());
}
