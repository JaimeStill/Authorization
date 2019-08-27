import { BannerService } from './banner.service';
import { CoreService } from './core.service';
import { ObjectMapService } from './object-map.service';
import { SidepanelService } from './sidepanel.service';
import { SnackerService } from './snacker.service';
import { ThemeService } from './theme.service';

import { UserService } from './api/user.service';

export const Services = [
  BannerService,
  CoreService,
  ObjectMapService,
  SidepanelService,
  SnackerService,
  ThemeService,
  UserService
];

export * from './banner.service';
export * from './core.service';
export * from './object-map.service';
export * from './sidepanel.service';
export * from './snacker.service';
export * from './theme.service';

export * from './api/data.service';
export * from './api/role.service';
export * from './api/user.service';

export * from './sockets/group-socket.service';
