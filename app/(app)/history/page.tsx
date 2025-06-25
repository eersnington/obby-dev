import { withAuth } from "@workos-inc/authkit-nextjs";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { Clock, Star, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import { SidebarToggle } from "components/app-layout/sidebar-toggle";
import { LowProfileFooter } from "components/landing/low-profile-footer";

export default async function HistoryPage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  const convexUser = await fetchQuery(api.users.getByWorkOSIdQuery, {
    workos_id: user.id,
  });

  if (!convexUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">User not found</p>
      </div>
    );
  }

  const allChats = await fetchQuery(api.chats.getLatestChats, {
    userId: convexUser._id,
  });

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMessageCount = (messages: unknown) => {
    if (!messages) return 0;
    return Array.isArray(messages) ? messages.length : 0;
  };

  return (
    <div className="bg-background h-full w-full p-3">
      <div className="flex flex-col bg-accent/30 border-2 border-accent h-full w-full rounded-lg shadow-sm">
        <header className="flex h-16 items-center gap-4 px-6 flex-shrink-0">
          <SidebarToggle />
        </header>
        <main className="flex-1 p-6 overflow-hidden">
          <div className="max-w-3xl mx-auto h-full overflow-y-auto">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-6 h-6" />
                <h1 className="text-3xl font-bold">Chat History</h1>
              </div>
              <p className="text-muted-foreground">
                Browse and manage all your conversations
              </p>
            </div>

            {allChats && allChats.length > 0 ? (
              <div className="grid gap-4">
                {allChats.map((chat) => (
                  <Card
                    key={chat._id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <CardTitle className="truncate">
                            <Link
                              href={`/chat/${chat._id}`}
                              className="hover:underline"
                            >
                              {chat.title}
                            </Link>
                          </CardTitle>
                          {chat.isFavorite && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
                          )}
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/chat/${chat._id}`}>Open</Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{getMessageCount(chat.messages)} messages</span>
                        </div>
                        <div>Created {formatDate(chat._creationTime)}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            chat.visibility === "public"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {chat.visibility}
                        </Badge>
                        {chat.isFavorite && (
                          <Badge variant="outline" className="text-yellow-600">
                            Favorite
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No chats yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start a conversation to see your chat history here
                </p>
                <Button asChild>
                  <Link href="/">Start New Chat</Link>
                </Button>
              </div>
            )}
          </div>
        </main>
        <div className="flex-shrink-0">
          <LowProfileFooter />
        </div>
      </div>
    </div>
  );
}
