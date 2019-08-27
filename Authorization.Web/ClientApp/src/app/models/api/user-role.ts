import { Role } from './role';
import { User } from './user';

export interface UserRole {
  id: number;
  roleId: number;
  userId: number;

  role: Role;
  user: User;
}
