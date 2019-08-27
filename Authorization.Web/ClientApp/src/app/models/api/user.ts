import { UserRole } from './user-role';

export interface User {
  id: number;
  guid: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  socketName: string;
  theme: string;
  sidepanel: string;
  isAdmin: boolean;
  isDeleted: boolean;

  userRoles: UserRole[];
}
