import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export type PermissionSection =
  | "speakers"
  | "committee"
  | "agenda"
  | "partners"
  | "social"
  | "feature-flags"
  | "users";

export type PermissionAction = "read" | "create" | "update" | "delete";

export interface UserPermissions {
  role: string;
  permissions: { section: string; actions: string[] }[];
}

export function hasPermission(
  user: UserPermissions,
  section: PermissionSection,
  action: PermissionAction
): boolean {
  if (user.role === "superAdmin") return true;
  return user.permissions.some(
    (p) => p.section === section && p.actions.includes(action)
  );
}

export async function requirePermission(
  section: PermissionSection,
  action: PermissionAction
): Promise<{ user: UserPermissions; error?: NextResponse }> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      user: { role: "", permissions: [] },
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const user = session.user as unknown as UserPermissions;

  if (!hasPermission(user, section, action)) {
    return {
      user,
      error: NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      ),
    };
  }

  return { user };
}
