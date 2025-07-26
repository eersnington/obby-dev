'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { SidebarHistory } from './sidebar-history';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import type { User } from '@workos-inc/node';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export const AppSidebar = ({
  user,
  os,
}: {
  user: User | null;
  os: string | null;
}) => {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const [openCommandDialog, setOpenCommandDialog] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCommandDialog((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelectChat = (chatId: string) => {
    router.push(`/chat/${chatId}`);
    setOpenCommandDialog(false);
    setOpenMobile(false);
  };

  if (!user) {
    return null;
  }

  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]! border-none">
      <SidebarHeader className="bg-background">
        <Button
          asChild
          className="h-9 w-full justify-center border-border/50 bg-background/50 hover:bg-accent/50"
          variant="outline"
        >
          <Link href="/chat">New Chat</Link>
        </Button>
        <Button
          className="group h-9 w-full justify-between overflow-hidden text-start"
          onClick={() => setOpenCommandDialog(true)}
          type="button"
          variant="ghost"
        >
          <span className="inline-flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search chats
          </span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] text-muted-foreground opacity-0 transition-all duration-100 ease-out group-hover:translate-x-0 group-hover:opacity-100">
            <span className="text-xs">{os === 'macOS' ? '⌘' : 'Ctrl'}</span>K
          </kbd>
        </Button>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <SidebarHistory
          onSelectChat={handleSelectChat}
          openCommandDialog={openCommandDialog}
          setOpenCommandDialog={setOpenCommandDialog}
          user={user}
        />
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <Alert
          className="hover:-translate-y-1.5 transition-transform duration-300 ease-out hover:border-accent-foreground/50"
          variant="default"
        >
          <AlertTitle>We're Public Beta!</AlertTitle>
          <AlertDescription>
            Sorry if you're experience a lot of bugs at the moment. Will be
            ironed out in a few days
          </AlertDescription>
        </Alert>
      </SidebarFooter>
    </Sidebar>
  );
};
