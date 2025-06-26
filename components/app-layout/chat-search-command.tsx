// client component but im removing the directive to get rid of the stupid "Props must be serializable for components in the "use client" entry file. "
import React from 'react';
import { isToday, isYesterday, subMonths, subWeeks } from 'date-fns';
import { LoaderCircle } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import type { Doc } from '@/convex/_generated/dataModel';
import type { VisibilityType } from '../artifact-blocks/visibility-selector';

type Chat = {
  title: string;
  visibility: VisibilityType;
  chatId: string;
  userId: Doc<'users'>['userId'];
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
      const chatDate = new Date(chat.createdAt);

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

interface ChatSearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  history: Chat[] | undefined;
  onSelectChat: (chatId: string) => void;
}

export const ChatSearchCommand: React.FC<ChatSearchCommandProps> = ({
  open,
  onOpenChange,
  history,
  onSelectChat,
}) => {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search chats..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {history ? (
          (() => {
            const groupedChats = groupChatsByDate(history);
            return (
              <>
                {groupedChats.today.length > 0 && (
                  <CommandGroup heading="Today">
                    {groupedChats.today.map((chat) => (
                      <CommandItem
                        key={chat.chatId}
                        value={`${chat.chatId} ${chat.title}`}
                        onSelect={() => onSelectChat(chat.chatId)}
                        className="cursor-pointer"
                      >
                        {chat.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                {groupedChats.yesterday.length > 0 && (
                  <CommandGroup heading="Yesterday">
                    {groupedChats.yesterday.map((chat) => (
                      <CommandItem
                        key={chat.chatId}
                        value={`${chat.chatId} ${chat.title}`}
                        onSelect={() => onSelectChat(chat.chatId)}
                        className="cursor-pointer"
                      >
                        {chat.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                {groupedChats.lastWeek.length > 0 && (
                  <CommandGroup heading="Last 7 days">
                    {groupedChats.lastWeek.map((chat) => (
                      <CommandItem
                        key={chat.chatId}
                        value={`${chat.chatId} ${chat.title}`}
                        onSelect={() => onSelectChat(chat.chatId)}
                        className="cursor-pointer"
                      >
                        {chat.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                {groupedChats.lastMonth.length > 0 && (
                  <CommandGroup heading="Last 30 days">
                    {groupedChats.lastMonth.map((chat) => (
                      <CommandItem
                        key={chat.chatId}
                        value={`${chat.chatId} ${chat.title}`}
                        onSelect={() => onSelectChat(chat.chatId)}
                        className="cursor-pointer"
                      >
                        {chat.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                {groupedChats.older.length > 0 && (
                  <CommandGroup heading="Older">
                    {groupedChats.older.map((chat) => (
                      <CommandItem
                        key={chat.chatId}
                        value={`${chat.chatId} ${chat.title}`}
                        onSelect={() => onSelectChat(chat.chatId)}
                        className="cursor-pointer"
                      >
                        {chat.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            );
          })()
        ) : (
          <div className="p-4 flex justify-center items-center">
            <LoaderCircle className="w-6 h-6 animate-spin" />
          </div>
        )}
      </CommandList>
    </CommandDialog>
  );
};
