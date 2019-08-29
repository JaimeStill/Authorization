import { BannerComponent } from './banner/banner.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { PanelLinkComponent } from './sidepanel/panel-link.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';

import { CategoryComponents } from './category';
import { DataComponents } from './data';
import { RoleComponents } from './role';
import { UserComponents } from './user';

export const Components = [
  BannerComponent,
  FileUploadComponent,
  SearchbarComponent,
  PanelLinkComponent,
  SidepanelComponent,
  ...CategoryComponents,
  ...DataComponents,
  ...RoleComponents,
  ...UserComponents
];
