export enum PermissionEnum {
  LINE_CREATE = "line_create",
  SUPER_ADMIN = "super_admin"
}

export interface Permission {
  id?: string;
  name: string;
}
