// client component but im removing the directive to get rid of the stupid "Props must be serializable for components in the "use client" entry file. "

import {
  memo,
  useState,
  useMemo,
  type Dispatch,
  type SetStateAction,
  useRef,
  useEffect,
} from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { isToday, isYesterday, subMonths, subWeeks } from 'date-fns';
import {
  Check,
  MoreHorizontal,
  Share2,
  Trash,
  Pencil,
  Pin,
  PinOff,
  LoaderCircle,
} from 'lucide-react';
import { useChatVisibility } from '@/hooks/use-chat-visibility';
import { useIntersectionObserver } from 'usehooks-ts';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import type { VisibilityType } from '../artifact-blocks/visibility-selector';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMutation, usePaginatedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import type { Doc } from '@/convex/_generated/dataModel';
import { ChatSearchCommand } from './chat-search-command';
import type { User } from '@workos-inc/node';

type Chat = {
  _id: Doc<'chats'>['_id'];
  _creationTime: number;
  title: string;
  visibility: VisibilityType;
  chatId: string;
  userId: Doc<'users'>['userId'];
  isPinned?: boolean;
  createdAt: number;
};

type GroupedChats = {
  today: Chat[];
  yesterday: Chat[];
  lastWeek: Chat[];
  lastMonth: Chat[];
  older: Chat[];
};

const groupChatsByDate = (chats: Chat[]): GroupedChats => {
  const now = new Date();
  const oneWeekAgo = subWeeks(now, 1);
  const oneMonthAgo = subMonths(now, 1);

  return chats.reduce(
    (groups, chat) => {
      const chatDate = new Date(chat._creationTime);

      if (isToday(chatDate)) {
        groups.today.push(chat);
      } else if (isYesterday(chatDate)) {
        groups.yesterday.push(chat);
      } else if (chatDate > oneWeekAgo) {
        groups.lastWeek.push(chat);
      } else if (chatDate > oneMonthAgo) {
        groups.lastMonth.push(chat);
      } else {
        groups.older.push(chat);
      }

      return groups;
    },
    {
      today: [],
      yesterday: [],
      lastWeek: [],
      lastMonth: [],
      older: [],
    } as GroupedChats,
  );
};

const PureChatItem = ({
  chat,
  isActive,
  onDelete,
  setOpenMobile,
}: {
  chat: Chat;
  isActive: boolean;
  onDelete: (chatId: string) => void;
  setOpenMobile: (open: boolean) => void;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [editingTitle, setEditingTitle] = useState(chat.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const { visibilityType, setVisibilityType } = useChatVisibility({
    chatId: chat.chatId,
    initialVisibilityType: chat.visibility,
  });
  const renameChat = useMutation(api.chats.renameChat);
  const togglePin = useMutation(api.chats.togglePinChat);

  useEffect(() => {
    if (isRenaming) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isRenaming]);

  const handleRenameSubmit = () => {
    const newTitle = editingTitle.trim();
    setIsRenaming(false);

    if (newTitle && newTitle !== chat.title) {
      toast.promise(renameChat({ chatId: chat.chatId, newTitle }), {
        loading: 'Renaming...',
        success: 'Chat renamed',
        error: (err) => {
          return `Failed to rename chat: ${err.message || 'Unknown error'}`;
        },
      });
    } else {
      setEditingTitle(chat.title);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleRenameSubmit();
    } else if (event.key === 'Escape') {
      setEditingTitle(chat.title);
      setIsRenaming(false);
    }
  };

  const handleTogglePin = () => {
    toast.promise(togglePin({ chatId: chat.chatId }), {
      loading: chat.isPinned ? 'Unpinning...' : 'Pinning...',
      success: (data) => (data.isPinned ? 'Chat pinned' : 'Chat unpinned'),
      error: 'Failed to update pin status',
    });
  };

  return (
    <SidebarMenuItem className="mb-1">
      {isRenaming ? (
        <div className="flex items-center px-2 py-1.5 w-full">
          <Input
            ref={inputRef}
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            onBlur={handleRenameSubmit}
            onKeyDown={handleKeyDown}
            className="h-7 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-ring"
          />
        </div>
      ) : (
        <SidebarMenuButton asChild isActive={isActive}>
          <Link
            href={`/chat/${chat.chatId}`}
            onClick={() => setOpenMobile(false)}
            className="flex items-center justify-between"
          >
            <span className="truncate flex-1 mr-2">{chat.title}</span>
          </Link>
        </SidebarMenuButton>
      )}

      {!isRenaming && (
        <DropdownMenu
          modal={true}
          open={dropdownOpen}
          onOpenChange={setDropdownOpen}
        >
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground mr-0.5"
              showOnHover={!isActive}
            >
              <MoreHorizontal className="w-4 h-4" />
              <span className="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={(e) => {
                e.preventDefault();
                handleTogglePin();
                setDropdownOpen(false);
              }}
            >
              {chat.isPinned ? (
                <PinOff className="w-4 h-4 mr-2" />
              ) : (
                <Pin className="w-4 h-4 mr-2" />
              )}
              <span>{chat.isPinned ? 'Unpin' : 'Pin'}</span>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer">
                <Share2 className="w-4 h-4 mr-2" />
                <span>Share</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    className="cursor-pointer flex-row justify-between"
                    onClick={() => {
                      setVisibilityType('private');
                    }}
                  >
                    Private
                    {visibilityType === 'private' ? (
                      <Check className="w-4 h-4" />
                    ) : null}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer flex-row justify-between"
                    onClick={() => {
                      setVisibilityType('public');
                      const url = `${window.location.origin}/chat/${chat.chatId}`;
                      navigator.clipboard
                        .writeText(url)
                        .then(() => {
                          toast('Link copied to clipboard');
                        })
                        .catch((err) => {
                          console.error('Failed to copy link: ', err);
                          toast.error('Failed to copy link');
                        });
                    }}
                  >
                    Public
                    {visibilityType === 'public' ? (
                      <Check className="w-4 h-4" />
                    ) : null}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={(event) => {
                event.preventDefault();
                setEditingTitle(chat.title);
                setIsRenaming(true);
                setDropdownOpen(false);
              }}
            >
              <Pencil className="w-4 h-4 mr-2" />
              <span>Rename</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:bg-destructive/15 focus:text-destructive dark:text-red-500"
              onSelect={(event) => {
                event.preventDefault();
                onDelete(chat.chatId);
                setDropdownOpen(false);
              }}
            >
              <Trash className="w-4 h-4 mr-2" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </SidebarMenuItem>
  );
};

export const ChatItem = memo(PureChatItem, (prevProps, nextProps) => {
  if (prevProps.isActive !== nextProps.isActive) return false;
  if (prevProps.chat.title !== nextProps.chat.title) return false;
  if (prevProps.chat.isPinned !== nextProps.chat.isPinned) return false;
  return true;
});

interface SidebarHistoryProps {
  user: User | null;
  openCommandDialog: boolean;
  setOpenCommandDialog: Dispatch<SetStateAction<boolean>>;
  onSelectChat: (chatId: string) => void;
}

const INITIAL_CHATS_PER_PAGE = 30;
const SUBSEQUENT_CHATS_PER_PAGE = 10;

export function SidebarHistory({
  user,
  openCommandDialog,
  setOpenCommandDialog,
  onSelectChat,
}: SidebarHistoryProps) {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  const chatId = useMemo(() => {
    const prefix = '/chat/';
    if (pathname.startsWith(prefix)) {
      return pathname.slice(prefix.length);
    }
    return null;
  }, [pathname]);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { results, status, loadMore } = usePaginatedQuery(
    api.chats.listChatsByUserId,
    user ? { userId: user.id } : 'skip',
    { initialNumItems: INITIAL_CHATS_PER_PAGE },
  );

  const { ref: loadMoreRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
  });

  useEffect(() => {
    if (isIntersecting && status === 'CanLoadMore') {
      loadMore(SUBSEQUENT_CHATS_PER_PAGE);
    }
  }, [isIntersecting, status, loadMore]);

  const deleteChat = useMutation(api.chats.deleteChatById);

  const handleDelete = async () => {
    if (!deleteId) return;
    toast.promise(deleteChat({ id: deleteId }), {
      loading: 'Deleting...',
      success: () => {
        setShowDeleteDialog(false);
        setDeleteId(null);
        if (deleteId === chatId) {
          router.push('/');
        }
        return 'Chat deleted';
      },
      error: 'Failed to delete chat',
    });
  };

  const { allChats, pinnedChats, otherChatsGrouped } = useMemo(() => {
    if (!results)
      return { allChats: [], pinnedChats: [], otherChatsGrouped: null };

    const mappedChats: Chat[] = results.map((chat) => ({
      _id: chat._id,
      _creationTime: chat._creationTime,
      title: chat.title,
      visibility: chat.visibility,
      chatId: chat.chatId,
      userId: chat.userId,
      isPinned: chat.isPinned ?? false,
      createdAt: chat._creationTime,
    }));

    mappedChats.sort((a, b) => {
      const pinnedA = a.isPinned ?? false;
      const pinnedB = b.isPinned ?? false;
      if (pinnedA !== pinnedB) {
        return pinnedA ? -1 : 1;
      }
      return b._creationTime - a._creationTime;
    });

    const pinned = mappedChats.filter((chat) => chat.isPinned);
    const others = mappedChats.filter((chat) => !chat.isPinned);

    return {
      allChats: mappedChats,
      pinnedChats: pinned,
      otherChatsGrouped: groupChatsByDate(others),
    };
  }, [results]);

  if (!user) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <div className="px-2 text-zinc-500 w-full flex flex-row justify-center items-center text-sm gap-2">
            Login to save and revisit previous chats.
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (status === 'LoadingFirstPage') {
    return (
      <SidebarGroup>
        <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
          Loading...
        </div>
        <SidebarGroupContent>
          <div className="flex flex-col">
            {[44, 32, 28, 64, 52].map((item) => (
              <div
                key={item}
                className="rounded-md h-8 flex gap-2 px-2 items-center"
              >
                <div
                  className="h-4 rounded-md flex-1 max-w-[--skeleton-width] bg-sidebar-accent-foreground/10"
                  style={
                    {
                      '--skeleton-width': `${item}%`,
                    } as React.CSSProperties
                  }
                />
              </div>
            ))}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (results && results.length === 0) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <div className="px-2 text-zinc-500 w-full flex flex-row justify-center items-center text-sm gap-2">
            Your conversations will appear here once you start chatting.
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <>
      {pinnedChats.length > 0 && (
        <SidebarGroup>
          <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
            Pinned
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {pinnedChats.map((chat) => (
                <ChatItem
                  key={chat._id}
                  chat={chat}
                  isActive={chat.chatId === chatId}
                  onDelete={(chatId) => {
                    setDeleteId(chatId);
                    setShowDeleteDialog(true);
                  }}
                  setOpenMobile={setOpenMobile}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {otherChatsGrouped &&
        Object.values(otherChatsGrouped).some((group) => group.length > 0) && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <div className="flex flex-col gap-6">
                  {otherChatsGrouped.today.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
                        Today
                      </div>
                      {otherChatsGrouped.today.map((chat) => (
                        <ChatItem
                          key={chat._id}
                          chat={chat}
                          isActive={chat.chatId === chatId}
                          onDelete={(chatId) => {
                            setDeleteId(chatId);
                            setShowDeleteDialog(true);
                          }}
                          setOpenMobile={setOpenMobile}
                        />
                      ))}
                    </div>
                  )}

                  {otherChatsGrouped.yesterday.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
                        Yesterday
                      </div>
                      {otherChatsGrouped.yesterday.map((chat) => (
                        <ChatItem
                          key={chat._id}
                          chat={chat}
                          isActive={chat.chatId === chatId}
                          onDelete={(chatId) => {
                            setDeleteId(chatId);
                            setShowDeleteDialog(true);
                          }}
                          setOpenMobile={setOpenMobile}
                        />
                      ))}
                    </div>
                  )}

                  {otherChatsGrouped.lastWeek.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
                        Last 7 days
                      </div>
                      {otherChatsGrouped.lastWeek.map((chat) => (
                        <ChatItem
                          key={chat._id}
                          chat={chat}
                          isActive={chat.chatId === chatId}
                          onDelete={(chatId) => {
                            setDeleteId(chatId);
                            setShowDeleteDialog(true);
                          }}
                          setOpenMobile={setOpenMobile}
                        />
                      ))}
                    </div>
                  )}

                  {otherChatsGrouped.lastMonth.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
                        Last 30 days
                      </div>
                      {otherChatsGrouped.lastMonth.map((chat) => (
                        <ChatItem
                          key={chat._id}
                          chat={chat}
                          isActive={chat.chatId === chatId}
                          onDelete={(chatId) => {
                            setDeleteId(chatId);
                            setShowDeleteDialog(true);
                          }}
                          setOpenMobile={setOpenMobile}
                        />
                      ))}
                    </div>
                  )}

                  {otherChatsGrouped.older.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
                        Older
                      </div>
                      {otherChatsGrouped.older.map((chat) => (
                        <ChatItem
                          key={chat._id}
                          chat={chat}
                          isActive={chat.chatId === chatId}
                          onDelete={(chatId) => {
                            setDeleteId(chatId);
                            setShowDeleteDialog(true);
                          }}
                          setOpenMobile={setOpenMobile}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

      <div
        ref={loadMoreRef}
        className="h-10 w-full mt-4 flex justify-center items-center text-sm text-muted-foreground"
      >
        {status === 'LoadingMore' && (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        )}
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              chat and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ChatSearchCommand
        open={openCommandDialog}
        onOpenChange={setOpenCommandDialog}
        history={allChats}
        onSelectChat={onSelectChat}
      />
    </>
  );
}
