import { refreshSession, withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import { workos } from "../../(api)/api/workos";
import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  let session = await withAuth();

  if (!session) {
    return redirect("/pricing");
  }

  console.log("Session:", session.user);

  // If this is a new user who just subscribed, their role won't have been updated
  // so we need to refresh the session to get the updated role
  if (session && !session.role) {
    console.log("Refreshing session to get updated role...");
    // Get the user's organization memberships so we can extract the org ID
    const oms = await workos.userManagement.listOrganizationMemberships({
      userId: session.user?.id,
    });

    console.log("Organization memberships:", oms);

    if (oms.data.length > 0) {
      session = await refreshSession({
        organizationId: oms.data[0].organizationId,
        ensureSignedIn: true,
      });
    }
  }

  if (session?.organizationId) {
    // Create a new audit log entry
    console.log("Creating audit log entry for user login...");
    await workos.auditLogs.createEvent(session.organizationId, {
      action: "user.logged_in",
      occurredAt: new Date(),
      actor: {
        type: "user",
        id: session.user?.id,
        name: `${session.user?.firstName} ${session.user?.lastName}`,
        metadata: {
          role: session.role as string,
        },
      },
      targets: [
        {
          type: "user",
          id: session.user?.id,
          name: `${session.user?.firstName} ${session.user?.lastName}`,
        },
      ],
      context: {
        location:
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip") ||
          "unknown",
      },
      metadata: {},
    });
  }

  const role = session?.role;

  console.log("User session:", session);
  console.log("User role:", role);

  return redirect("/");

  // Redirect based on the user's role
  // switch (role) {
  //   case "admin":
  //     return redirect("/dashboard");

  //   case "member":
  //     return redirect("/product");

  //   default:
  //     // If there's no role that means the user hasn't subscribed yet, so redirect them to the pricing page
  //     return redirect("/pricing");
  // }
};
