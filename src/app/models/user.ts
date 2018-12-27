export type UserRoles = 'admin'; // what else?

export type IUser = Partial<User>;

export class User {
  id: string;
  token: string;
  name: string;
  role: UserRoles;
  createdAt: Date;
  lastLogin: Date;
  updatedAt: Date;

  constructor(options: IUser) {
    this.id = options.id || undefined;
    this.token = options.token || undefined;
    this.name = options.name || undefined;
    this.role = options.role || undefined;
    this.createdAt = options.createdAt || new Date();
    this.lastLogin = options.lastLogin || undefined;
    this.updatedAt = options.updatedAt || undefined;
  }
}
