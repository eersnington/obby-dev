import { AppSidebar } from "./app-sidebar";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export default async function AppSidebarWrapper() {
  try {
    const { user } = await withAuth();

    if (!user) {
      return <AppSidebar isAuthenticated={false} />;
    }

    const convexUser = await fetchQuery(api.users.getByWorkOSIdQuery, {
      workos_id: user.id,
    });

    if (!convexUser) {
      return <AppSidebar isAuthenticated={false} />;
    }

    // Pre-fetch only recent chats on the server
    const recentChats = await fetchQuery(api.chats.getRecentChats, {
      userId: convexUser._id,
    });

    return (
      <AppSidebar
        userId={convexUser._id as Id<"users">}
        isAuthenticated={true}
        initialRecentChats={recentChats}
      />
    );
  } catch (error) {
    console.error("Error loading sidebar:", error);
    return <AppSidebar isAuthenticated={false} />;
  }
}
