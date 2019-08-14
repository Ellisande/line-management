import { Permission } from "./Permission";

export interface User {
  id?: string;
  name: string;
  permissions: Permission[];
}
