import { ConfirmDialog } from './confirm.dialog';

import { AddUserDialog } from './user/add-user.dialog';
import { AdminUserDialog } from './user/admin-user.dialog';
import { UserBinDialog } from './user/user-bin.dialog';
import { UserSettingsDialog } from './user/user-settings.dialog';

import { CategoryDialogs } from './category';
import { DataDialogs } from './data';

export const Dialogs = [
  ConfirmDialog,
  AddUserDialog,
  AdminUserDialog,
  UserBinDialog,
  UserSettingsDialog,
  ...CategoryDialogs,
  ...DataDialogs
];

export * from './confirm.dialog';

export * from './user/add-user.dialog';
export * from './user/admin-user.dialog';
export * from './user/user-bin.dialog';
export * from './user/user-settings.dialog';

export * from './category';
export * from './data';
