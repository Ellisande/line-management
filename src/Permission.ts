export enum PermissionEnum {
  LINE_CREATE = "line_create",
  SUPER_ADMIN = "super_admin",
  TERMINAL = "terminal",
  MANAGE = "manage"
}

export interface Permission {
  id?: string;
  name: string;
}
