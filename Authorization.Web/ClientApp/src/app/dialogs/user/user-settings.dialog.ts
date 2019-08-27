import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSelectChange
} from '@angular/material';

import {
  Component,
  Inject,
  ViewChild,
  ElementRef
} from '@angular/core';

import {
  CoreService,
  SidepanelService,
  ThemeService,
  UserService
} from '../../services';

import {
  Theme,
  User
} from '../../models';

@Component({
  selector: 'user-settings-dialog',
  templateUrl: 'user-settings.dialog.html'
})
export class UserSettingsDialog {
  private initialized = false;
  validUsername = true;

  constructor(
    private core: CoreService,
    private dialogRef: MatDialogRef<UserSettingsDialog>,
    public identity: UserService,
    public sidepanel: SidepanelService,
    public themer: ThemeService,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) { }

  @ViewChild('userInput', { static: false })
  set userInput(input: ElementRef) {
    if (input && !this.initialized) {
      this.core.generateInputObservable(input)
        .subscribe(async val => {
          this.user.userName = this.core.urlEncode(val);
          this.validUsername = await this.identity.validateUsername(this.user);
        });
      this.initialized = true;
    }
  }

  toggleTheme = (event: MatSelectChange, themes: Theme[]) =>
    this.themer.setTheme(themes.find(t => t.name === event.value));

  toggleSidepanel = (event: MatSelectChange) =>
    this.sidepanel.setState(event.value);

  updateUser = async () => {
    const res = await this.identity.updateUser(this.user);
    res && this.dialogRef.close();
  }
}
