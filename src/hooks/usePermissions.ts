import { Permission, PermissionEnum } from "./../Permission";
import { useFirestore } from "../context/firestoreContext";
import { useEffect, useState } from "react";
import { useAuthenticated } from "./useAuthenticated";

export const usePermissions = (
  userId: string | undefined | null
): Permission[] | undefined => {
  const db = useFirestore();
  const [permissions, setPermissions] = useState<Permission[] | undefined>(
    undefined
  );
  useEffect(() => {
    if (!db || !userId) {
      return () => {};
    }
    return db
      .collection(`/users/${userId}/permissions`)
      .onSnapshot(snapshot => {
        let tempPermissions: Permission[] = [];
        snapshot.forEach(doc => {
          const newLine = <Permission>{ ...doc.data(), id: doc.id };
          tempPermissions = [...tempPermissions, newLine];
        });
        setPermissions(tempPermissions);
      });
  }, [db, userId]);
  return permissions;
};

export const useAuthorized = (
  userId: string | undefined,
  requiredPermissions: PermissionEnum[] | PermissionEnum
): boolean => {
  const permissions = usePermissions(userId);
  const requiredPermissionsConverted =
    requiredPermissions instanceof Array
      ? requiredPermissions
      : [requiredPermissions];
  if (!permissions || permissions.length == 0) {
    return false;
  }
  const permissionNames = permissions.map(permission => permission.name);
  const hasRequired = requiredPermissionsConverted.every(
    requiredPermission =>
      !!permissionNames.find(
        permissionName => permissionName == requiredPermission.valueOf()
      )
  );
  return hasRequired;
};

export const useHasAnyPermission = (): boolean => {
  const userId = useAuthenticated();
  const permissions = usePermissions(userId);
  if (!userId) {
    return false;
  }
  const hasAtLeastOnePermission = permissions && permissions.length > 0;
  return hasAtLeastOnePermission || false;
};
