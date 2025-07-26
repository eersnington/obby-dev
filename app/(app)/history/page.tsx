import { withAuth } from '@workos-inc/authkit-nextjs';
import { fetchQuery } from 'convex/nextjs';
import { api } from '../../../convex/_generated/api';
import Link from 'next/link';
import { Clock, Star, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Badge } from 'components/ui/badge';
import { Button } from 'components/ui/button';
import { SidebarToggle } from 'components/app-layout/sidebar-toggle';
import { LowProfileFooter } from 'components/landing/low-profile-footer';

export default async function HistoryPage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  const convexUser = await fetchQuery(api.users.getByWorkOSIdQuery, {
    workos_id: user.id,
  });

  if (!convexUser) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">User not found</p>
      </div>
    );
  }

  const allChats = await fetchQuery(api.chats.getLatestChats, {
    userId: convexUser._id,
  });

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMessageCount = (messages: unknown) => {
    if (!messages) return 0;
    return Array.isArray(messages) ? messages.length : 0;
  };

  return (
    <div className="h-full w-full bg-background p-3">
      <div className="flex h-full w-full flex-col rounded-lg border-2 border-accent bg-accent/30 shadow-sm">
        <header className="flex h-16 flex-shrink-0 items-center gap-4 px-6">
          <SidebarToggle />
        </header>
        <main className="flex-1 overflow-hidden p-6">
          <div className="mx-auto h-full max-w-3xl overflow-y-auto">
            <div className="mb-8">
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-6 w-6" />
                <h1 className="font-bold text-3xl">Chat History</h1>
              </div>
              <p className="text-muted-foreground">
                Browse and manage all your conversations
              </p>
            </div>

            {allChats && allChats.length > 0 ? (
              <div className="grid gap-4">
                {allChats.map((chat) => (
                  <Card
                    className="transition-shadow hover:shadow-md"
                    key={chat._id}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                          <CardTitle className="truncate">
                            <Link
                              className="hover:underline"
                              href={`/chat/${chat._id}`}
                            >
                              {chat.title}
                            </Link>
                          </CardTitle>
                          {chat.isFavorite && (
                            <Star className="h-4 w-4 flex-shrink-0 fill-current text-yellow-500" />
                          )}
                        </div>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/chat/${chat._id}`}>Open</Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="mb-3 flex items-center gap-4 text-muted-foreground text-sm">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{getMessageCount(chat.messages)} messages</span>
                        </div>
                        <div>Created {formatDate(chat._creationTime)}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            chat.visibility === 'public'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {chat.visibility}
                        </Badge>
                        {chat.isFavorite && (
                          <Badge className="text-yellow-600" variant="outline">
                            Favorite
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-semibold text-lg">No chats yet</h3>
                <p className="mb-4 text-muted-foreground">
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
