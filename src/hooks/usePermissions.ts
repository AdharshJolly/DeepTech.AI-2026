"use client";

import { useSession } from "next-auth/react";

export type PermissionSection =
  | "speakers"
  | "committee"
  | "agenda"
  | "partners"
  | "social"
  | "feature-flags"
  | "users";

export type PermissionAction = "read" | "create" | "update" | "delete";

export function usePermissions() {
  const { data: session } = useSession();
  
  const user = session?.user as {
    role: string;
    permissions?: { section: string; actions: string[] }[];
  } | undefined;

  const hasPermission = (section: PermissionSection, action: PermissionAction): boolean => {
    if (!user) return false;
    if (user.role === "superAdmin") return true;
    const perms = user.permissions || [];
    const sectionPerm = perms.find((p) => p.section === section);
    return sectionPerm ? sectionPerm.actions.includes(action) : false;
  };

  return {
    hasPermission,
    role: user?.role,
    isLoading: !session,
  };
}
